require("dotenv").config();

export enum ENV_KEY {
  MNEMONIC,
  RPC_ENDPOINT,
  CONTRACT_PATH,
  CONTRACT_CW721_PATH,
  PREFIX_CHAIN,
  CHAIN_MONEY_DENOM,
  CORE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  CW20_CONTRACT_ADDRESS,
}

export function getEnv(key: ENV_KEY): string {
  switch (key) {
    case ENV_KEY.MNEMONIC:
      return process.env.MNEMONIC as string;
    case ENV_KEY.RPC_ENDPOINT:
      return process.env.RPC_ENDPOINT as string;
    case ENV_KEY.CONTRACT_PATH:
      return process.env.CONTRACT_PATH as string;
    case ENV_KEY.CONTRACT_CW721_PATH:
      return process.env.CONTRACT_CW721_PATH as string;
    case ENV_KEY.PREFIX_CHAIN:
      return process.env.PREFIX_CHAIN as string;
    case ENV_KEY.CHAIN_MONEY_DENOM:
      return process.env.CHAIN_MONEY_DENOM as string;
    case ENV_KEY.CORE_CONTRACT_ADDRESS:
      return process.env.CORE_CONTRACT_ADDRESS as string;
    case ENV_KEY.NFT_CONTRACT_ADDRESS:
      return process.env.NFT_CONTRACT_ADDRESS as string;
    case ENV_KEY.CW20_CONTRACT_ADDRESS:
      return process.env.CW20_CONTRACT_ADDRESS as string;

    default:
      throw new Error(`No env key ${key}`);
  }
}
