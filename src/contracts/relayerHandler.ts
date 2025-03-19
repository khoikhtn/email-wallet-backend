import {gasLimit, setUpClient} from "../global";
import {u256} from "../interfaces/alias";
import {relayerHandlerAddr} from "./emailWalletCore";

export async function registerRelayer(
    params: {
        rand_hash: u256,
        email_addr: String,
        hostname: String,
    }
): Promise<string> {
    const {client, address} = await setUpClient();
    console.log(params);
    try {
        let tx = await client.execute(
            address,
            await relayerHandlerAddr(),
            {
                register_relayer: params,
            },
            gasLimit
        );
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}