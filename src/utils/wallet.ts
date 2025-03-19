import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {ENV_KEY, getEnv} from "./config";

export async function importMnemonic(mnemonic: string): Promise<DirectSecp256k1HdWallet> {
    return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: getEnv(ENV_KEY.PREFIX_CHAIN),
    });
}

export async function getAddressFromWallet(wallet: DirectSecp256k1HdWallet): Promise<string> {
    let [{address}] = await wallet.getAccounts();
    return address;
}
