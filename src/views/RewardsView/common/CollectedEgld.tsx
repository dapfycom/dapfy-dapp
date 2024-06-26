import { ShoppingBagIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { formatBalance } from "@/utils/functions/formatBalance";
import BigNumber from "bignumber.js";
import { getCookie, setCookie } from "cookies-next";
import { createHash } from "crypto";
import { addDays, addMinutes } from "date-fns";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { claimRewards } from "../lib/services";
import {
  useGetIsUserInteractedDefiTool,
  useGetUnCollectedRewards,
  useGetUserTasks,
} from "../lib/tasks-hooks";
const CollectedEgld = () => {
  const { isAuthenticated } = useXAuthentication();
  const { rewards } = useGetUnCollectedRewards();
  const { tasks } = useGetUserTasks();
  const [mentionTokenPost, setMentionTokenPost] = useState(false);
  const token = "JEET-13213";

  const { isUserInteractedDefiTool } = useGetIsUserInteractedDefiTool();

  useEffect(() => {
    if (tasks?.mention) {
      const key = Buffer.from("x-mention", "utf-8").toString("hex");
      const boberPostCookie = getCookie(key);

      if (boberPostCookie) {
        const date = new Date(Number(boberPostCookie));

        if (new Date() > addMinutes(date, 15)) {
          setMentionTokenPost(true);
        }
      } else {
        setMentionTokenPost(false);

        setCookie(key, new Date().getTime(), {
          maxAge: 60 * 60 * 12,
        });
      }
    } else {
      setMentionTokenPost(false);
    }
  }, [tasks?.mention]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="flex gap-10 flex-col ">
        <div>
          <h4 className="text-blue-800 dark:text-blue-200 text-2xl mb-4">
            Complete today’s tasks to earn rewards
          </h4>
          <div className="w-full flex justify-center">
            <ul className="max-w-[600px] text-left flex flex-col gap-2">
              <li>
                <a
                  href="https://twitter.com/DapfyCom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UserTask
                    text="Comment one of our posts"
                    completed={!!tasks?.comment}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/DapfyCom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UserTask
                    text="Like one of our posts"
                    completed={!!tasks?.like}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/DapfyCom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UserTask
                    text="Retweet one of our posts"
                    completed={!!tasks?.rt}
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UserTask
                    text={`Write a post about @dapfycom on X`}
                    completed={!!tasks?.mention}
                  />
                </a>
              </li>

              <li>
                <UserTask
                  text={`Use the Swap aggregator or Dust converter`}
                  completed={isUserInteractedDefiTool}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="flex flex-col w-full max-w-[500px] gap-4">
            <div className="flex w-full justify-between mb">
              <p className="text-blue-800 dark:text-blue-200  text-sm sm:text-xl">
                Your uncollected EGLD:{" "}
              </p>
              <div className="flex gap-3 items-center">
                <Image src="/images/egld.svg" alt="" width={22} height={22} />
                <span className="font-bold">
                  {formatBalance({
                    balance: rewards,
                  })}
                </span>
              </div>
            </div>

            <Button
              key="1"
              className="inline-flex items-center justify-center rounded-full  px-6 py-2 text-white shadow-md"
              onClick={claimRewards}
              disabled={new BigNumber(rewards).isZero()}
            >
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              Collect
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectedEgld;

const AfterClickTask = ({
  text,
  sKey,
  time,
  url,
}: {
  completed?: boolean;
  text: string;
  time: number /* Minutes */;
  sKey: string;
  url?: string;
}) => {
  const [completed, setCompleted] = useState(false);
  const key = createHash("md5").update(sKey).digest("hex");

  const handleClick = () => {
    const currentDate = new Date();
    let expireDate = new Date();
    expireDate.setUTCHours(16, 0, 0, 0);

    if (currentDate.getUTCHours() >= 16) {
      expireDate = addDays(new Date(), 1);
      expireDate.setUTCHours(16, 0, 0, 0);
    }

    setCookie(key, new Date().getTime(), {
      expires: expireDate,
    });

    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    const completedTaskFromCookie = getCookie(key);

    if (
      addMinutes(new Date(Number(completedTaskFromCookie)), time) < new Date()
    ) {
      setCompleted(true);
    }
  }, [key, time]);
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <UserTask completed={completed} text={text} />
    </div>
  );
};

const UserTask = ({
  completed,
  text,
}: {
  completed?: boolean;
  text: string;
}) => {
  return (
    <span className="flex gap-3">
      <span className="w-[18px] sm:w-[23px]">
        {completed ? (
          <CheckCircle2 className="text-green-500 w-[18px] sm:w-[23px]" />
        ) : (
          <Circle className="text-green-500 w-[18px] sm:w-[23px]" />
        )}
      </span>

      <div className="flex flex-auto">
        {text} <ArrowRight />
      </div>
    </span>
  );
};
