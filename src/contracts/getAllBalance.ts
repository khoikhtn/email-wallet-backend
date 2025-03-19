import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ENV_KEY, getEnv } from "../utils/config";

export async function getBalance(accountAddr: string) {
  const rpcEndpoint = getEnv(ENV_KEY.RPC_ENDPOINT);
  const cw20Contract = getEnv(ENV_KEY.CW20_CONTRACT_ADDRESS);
  const cw721Contract = getEnv(ENV_KEY.NFT_CONTRACT_ADDRESS);
  const cw20Balance = await getCW20Balance(
    rpcEndpoint,
    cw20Contract,
    accountAddr
  );

  const cw721Balance = await getCW721Balance(
    rpcEndpoint,
    cw721Contract,
    accountAddr
  );
  return { cw20Balance: cw20Balance, cw721Balance: cw721Balance };
}

async function getCW20Balance(
  rpcEndpoint: string,
  contractAddress: string,
  accountAddress: string
) {
  const client = await CosmWasmClient.connect(rpcEndpoint);
  const query = {
    balance: { address: accountAddress }, // CW20 query structure
  };

  const result = await client.queryContractSmart(contractAddress, query);
  console.log(`CW20 Balance for ${accountAddress}:`, result.balance);

  return result.balance;
}

async function getCW721Balance(
  rpcEndpoint: string,
  contractAddress: string,
  accountAddress: string
) {
  const client = await CosmWasmClient.connect(rpcEndpoint);

  // Query the tokens owned by the account
  const query = {
    tokens: { owner: accountAddress }, // CW721 query structure
  };

  const result = await client.queryContractSmart(contractAddress, query);
  console.log(`CW721 Tokens for ${accountAddress}:`, result.tokens);

  return result.tokens; // Tokens is usually returned as an array of token IDs
}
