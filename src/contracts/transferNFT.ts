import {ENV_KEY, getEnv} from "../utils/config";
import {GasPrice} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {gasLimit, gasPrice} from "../global";

export async function transferNFT(
    signer: DirectSecp256k1HdWallet,
    toAddress: string,
    contract: string,
    tokenId: string
) {
    const client = await SigningCosmWasmClient.connectWithSigner(
        getEnv(ENV_KEY.RPC_ENDPOINT),
        signer,
        {
            gasPrice
        }
    );
    const [{address: fromAddr}] = await signer.getAccounts();

    try {
        const tx = await client.execute(
            fromAddr,
            contract,
            {
                transfer_nft: {
                    recipient: toAddress,
                    token_id: tokenId,
                },
            },
            gasLimit
        );
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}
