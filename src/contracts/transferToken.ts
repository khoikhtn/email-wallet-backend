import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {coins, DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {transferTokenDto} from "../interfaces/transferTokenDto";
import { ENV_KEY, getEnv } from "../utils/config";
import * as fs from "fs/promises"
import {gasLimit, gasPrice} from "../global";

export async function transferToken(
    signer: DirectSecp256k1HdWallet,
    dto: transferTokenDto
) {
  const client = await SigningCosmWasmClient.connectWithSigner(
    getEnv(ENV_KEY.RPC_ENDPOINT),
    signer,
    { 
      gasPrice
    }
  );

  const [{ address: fromAddr }] = await signer.getAccounts();

  const tokens = coins(dto.amount, dto.denom);
  const txRes = await client.sendTokens(
    fromAddr,
    dto.toAddress,
    tokens,
    gasLimit
  );

  const filePath = "./transactions/txResult.txt"

  try {
    await fs.mkdir("./transactions", { recursive: true });

    await fs.appendFile(filePath, `${txRes.transactionHash}\n`);
  } catch (error) {
    console.error("Cannot saving transaction hash")
  }

  return txRes.transactionHash;
}
