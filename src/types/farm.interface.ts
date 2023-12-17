import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
export interface IUserFarmInfo {
  userTokens: {
    reward: string;
    debtLp: string;
    debtNft: string;
  }[];
  lpActive: string;
  lpStopped: string;
  nftActive: string[];
  nftStopped: string[];
  lock: any;
}

export interface IFarmInfo {
  tokenId: string[];
  tokenNonce: string[];
  start: string[];
  end: string[];
  totalRewards: string[];
  perShareLp: string[];
  perShareNft: string[];
  stakedLp: string;
  stakedNft: string;
  block: string;
}

export interface IAshFarm {
  farm_click_id: number;
  pool_address: string;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_token: string;
  farm_token_nonce: number;
  farm_address: string;
  reward_token: string;
  total_deposited_amount: string;
  total_deposited_lp_amount: string;
  total_deposited_farm_amount: string;
  total_weighted_block: string;
  total_farm_rewards: string;
}

export interface IAshFarmScResponse {
  farm_click_id: BigNumber;
  pool_address: Address;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_token: string;
  farm_token_nonce: BigNumber;
  farm_address: Address;
  reward_token: string;
  total_deposited_amount: BigNumber;
  total_deposited_lp_amount: BigNumber;
  total_deposited_farm_amount: BigNumber;
  total_weighted_block: BigNumber;
  total_farm_rewards: BigNumber;
}
export interface IAshFarmEntriesScResponse {
  farm_click_id: BigNumber;
  token_id: string;
  deposited_amount: BigNumber;
  block_start_staking: BigNumber;
  lp_id: string;
  deposited_lp_amount: BigNumber;
  deposited_farm_amount: BigNumber;
  rewards: BigNumber;
}

export interface IAshFarmEntries {
  farm_click_id: number;
  token_id: string;
  deposited_amount: string;
  block_start_staking: string;
  lp_id: string;
  deposited_lp_amount: string;
  deposited_farm_amount: string;
  rewards: string;
}
export interface IOnDexFarm {
  farm_click_id: number;
  pool_address: string;
  pool_id: number;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_address: string;
  farm_id: number;
  reward_token: string;
  total_deposited_amount: string;
  total_deposited_lp_amount: string;
  total_weighted_block: string;
  total_lp_rewards: string;
}

export interface IOnDexScResponse {
  farm_click_id: BigNumber;
  pool_address: Address;
  pool_id: BigNumber;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_address: Address;
  farm_id: BigNumber;
  reward_token: string;
  total_deposited_amount: BigNumber;
  total_deposited_lp_amount: BigNumber;
  total_weighted_block: BigNumber;
  total_lp_rewards: BigNumber;
}

export interface IOnDexEntriesScResponse {
  farm_click_id: BigNumber;
  token_id: string;
  deposited_amount: BigNumber;
  block_start_staking: BigNumber;
  lp_id: string;
  deposited_lp_amount: BigNumber;
  rewards: BigNumber;
}

export interface IOnDexEntries {
  farm_click_id: number;
  token_id: string;
  deposited_amount: string;
  block_start_staking: string;
  lp_id: string;
  deposited_lp_amount: string;
  rewards: string;
}
