import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {ENV_KEY, getEnv} from "./utils/config";
import {importMnemonic} from "./utils/wallet";
import {calculateFee, GasPrice} from "@cosmjs/stargate";

const cache = {
    inner: null
}

export const gasPrice = GasPrice.fromString(
    `0.025${getEnv(ENV_KEY.CHAIN_MONEY_DENOM)}`
);

export const gasLimit = calculateFee(2e6, gasPrice);

export async function setUpClient(): Promise<{ client: SigningCosmWasmClient, address: string }> {
    if (cache.inner) {
        // @ts-ignore
        return cache.inner;
    }
    const wallet = await importMnemonic(getEnv(ENV_KEY.MNEMONIC));
    const [{address}] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(
        getEnv(ENV_KEY.RPC_ENDPOINT),
        wallet,
        {
            gasPrice: gasPrice,
        }
    );
    // @ts-ignore
    cache.inner = {
        client: client,
        address: address,
    };

    // @ts-ignore
    return cache.inner;
}
