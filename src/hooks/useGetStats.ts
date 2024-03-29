import { fetchStats } from "@/services/rest/elrond/network";
import { useEffect, useState } from "react";
import useSwr, { mutate } from "swr";
// every epoch change every 24h and there is a total of 14400 rounds per epoch

const useGetStats = () => {
  const { data, isLoading, error } = useSwr("/stats", fetchStats);

  return {
    stats: data,
    isLoading,
    error,
  };
};

export const useGetTimeUntilNextEpoch = () => {
  const { stats, isLoading, error } = useGetStats();
  let timeUntilNextEpoch = 0;

  if (stats) {
    const roundsUntilNextEpoch = stats?.roundsPerEpoch - stats?.roundsPassed;
    const timePerRound = 6; // 6 seconds per round

    timeUntilNextEpoch = roundsUntilNextEpoch * timePerRound;
  }
  return {
    timeUntilNextEpoch: !!stats ? timeUntilNextEpoch : undefined,
    isLoading,
    error,
  };
};

export const useGetMvxEpoch = () => {
  const {
    timeUntilNextEpoch: timeInSecondsUntilNextEpoch,
    isLoading,
    error,
  } = useGetTimeUntilNextEpoch();
  const nextEpochDateTime = new Date(
    Date.now() +
      (timeInSecondsUntilNextEpoch ? timeInSecondsUntilNextEpoch * 1000 : 0)
  );
  const previousEpochDateTime = new Date(
    nextEpochDateTime.getTime() - 86400000
  );
  return {
    nextEpoch: !!timeInSecondsUntilNextEpoch ? nextEpochDateTime : undefined,
    previousEpoch: !!timeInSecondsUntilNextEpoch
      ? previousEpochDateTime
      : undefined,
    isLoading,
    error,
  };
};

// this hooks use secondsToHms from src/utils/functions/dates.ts to convert seconds into a readable hour:minute:second format
// this hooks use useGetTimeUntilNextEpoch to get the time until the next epoch
// this will make a count down until the next epoch and when reach 0 will start again with the new epoch
export const useGetTimeUntilNextEpochCountDown = () => {
  const { timeUntilNextEpoch } = useGetTimeUntilNextEpoch();
  // const timeUntilNextEpoch = 10;
  const [time, setTime] = useState(timeUntilNextEpoch);

  useEffect(() => {
    if (!timeUntilNextEpoch) return;

    setTime(timeUntilNextEpoch);

    const intervalId = setInterval(() => {
      setTime((prevCountDown) => {
        if (prevCountDown) {
          if (prevCountDown <= 0) {
            mutate("/stats");
            return 86400;
          } else {
            return prevCountDown - 1;
          }
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeUntilNextEpoch]);

  return {
    timeUntilNextEpoch: time,
  };
};
