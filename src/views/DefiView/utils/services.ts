import { getSmartContractInteraction } from "@/services/sc";
import { scQuery } from "@/services/sc/queries";
import { IElrondToken } from "@/types/elrond.interface";
import {
  IMoneyMarkeTvl,
  IMoneyMarket,
  IMoneyMarketDeposit,
  IMoneyMarketReward,
} from "@/types/hatom.interface";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { parsMoneyMarket } from "./functions";

//calls
export const deposit = (
  amount: number | string,
  lpToken: IElrondToken,
  address: string
) => {
  getSmartContractInteraction("hatomParentWsp").ESDTorEGLDTransfer({
    functionName: "deposit",
    token: { ...lpToken, collection: lpToken.identifier },
    arg: [new AddressValue(new Address(address))],
    gasL: 300000000,
    value: new BigNumber(amount),
  });
};

export const claimUserRewards = (address: string) => {
  getSmartContractInteraction("hatomParentWsp").scCall({
    functionName: "claimUserRewards",
    gasL: 50000000,
    arg: [new AddressValue(new Address(address))],
  });
};

export const withdraw = (address: string) => {
  getSmartContractInteraction("hatomParentWsp").scCall({
    functionName: "withdraw",
    gasL: 50000000,
    arg: [new AddressValue(new Address(address))],
  });
};

// queries
export const fetchHatomMoneyMarkets = async (): Promise<IMoneyMarket[]> => {
  const res: any = await scQuery("hatomParentWsp", "getMoneyMarkets", []);
  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarket[] = data?.map((item: any) => {
    return parsMoneyMarket(item);
  });

  return paresedData;
};

export const fetchUserTotalRewards = async (
  userAddres: string
): Promise<IMoneyMarketReward[]> => {
  const res: any = await scQuery("hatomParentWsp", "getTotalRewards", [
    new AddressValue(new Address(userAddres)),
  ]);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarketReward[] = data?.map((item: any) => {
    const data: IMoneyMarketReward = {
      moneyMarket: parsMoneyMarket(item.money_market),
      rewards: item.rewards.toString(),
    };
    return data;
  });
  console.log("userHatomData", paresedData);

  return paresedData;
};

export const fetchUserDeposits = async (
  userAddres: string
): Promise<IMoneyMarketDeposit[]> => {
  const res: any = await scQuery("hatomParentWsp", "getDepositEntries", [
    new AddressValue(new Address(userAddres)),
  ]);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarketDeposit[] = data?.map((item: any) => {
    const data: IMoneyMarketDeposit = {
      moneyMarket: parsMoneyMarket(item.money_market),
      depositAmount: item.total_deposited_amount.toString(),
    };
    return data;
  });

  return paresedData;
};

export const fetctTotalTvl = async (): Promise<IMoneyMarkeTvl[]> => {
  const res: any = await scQuery("hatomParentWsp", "getTVL", []);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarkeTvl[] = data?.map((item: any) => {
    return {
      moneyMarket: parsMoneyMarket(item.money_market),
      tvl: item.tvl.toString(),
    };
  });
  console.log("getTVL", paresedData);

  return paresedData;
};