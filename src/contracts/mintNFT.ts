import {gasLimit, setUpClient} from "../global";

export async function mintNFT(
    owner: string,
    contract_address: string,
    token_id: string
) {
    let {client, address} = await setUpClient();
    try {
        const tx = await client.execute(
          address,
          contract_address,
          {
            mint: {
              owner: owner,
              token_id: token_id,
            },
          },
          gasLimit
        );
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}
