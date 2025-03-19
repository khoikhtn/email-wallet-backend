import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {gasLimit, gasPrice} from "../global";
import {ENV_KEY, getEnv} from "../utils/config";

export async function transferCW20(
    signer: DirectSecp256k1HdWallet,
    toAddress: string,
    amount: string,
    contract: string
) {
    const client = await SigningCosmWasmClient.connectWithSigner(
        getEnv(ENV_KEY.RPC_ENDPOINT),
        signer,
        {
            gasPrice,
        }
    );
    const [{address: fromAddr}] = await signer.getAccounts();

    try {
        const txRes = await client.execute(
            fromAddr,
            contract,
            {
                transfer: {
                    recipient: toAddress,
                    amount: amount,
                },
            },
            gasLimit
        );
        return txRes.transactionHash;
    } catch (error) {
        throw error;
    }
}
