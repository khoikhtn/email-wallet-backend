import {entropyToMnemonic} from "bip39";
import {importMnemonic} from "../utils/wallet";
import {AccountCreationProof} from "../interfaces/proof";
import {gasLimit, setUpClient} from "../global";
import {accountHandlerAddr} from "./emailWalletCore";

export async function getAccount(wallet_salt: string | Buffer) {
    const mnemonic = entropyToMnemonic(wallet_salt);
    return await importMnemonic(mnemonic);
}

export async function createAccount(
    proof: AccountCreationProof
): Promise<string> {
    const {client, address} = await setUpClient();

    console.log(JSON.stringify({
        create_account: proof,
    }, null, 4));
    try {
        let tx = await client.execute(
            address,
            await accountHandlerAddr(),
            {
                create_account: proof,
            },
            gasLimit
        );
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}