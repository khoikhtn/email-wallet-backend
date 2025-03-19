# Xion Backend API

- Backend API for [Xion Email Wallet]() which took part in [Xion Hackathon](https://dorahacks.io/hackathon/xion/buidl).

## Prequiresites

- npm: Version 10.7.0 or higher
- Node.js: Version 20.14.0

## How to run

### Clone

```bash
git clone https://github.com/bjergsen243/xion-email-wallet-backend
cd xion-email-wallet-backend
```

### Install

```bash
npm i
```

## Update env

```bash
cp .env.example .env
```

- Add the necessary environment variables as specified in `.env.example`

## Run server

```bash
npm run start
```

## Deploy your own tokens and NFT

- If you'd like to to deploy your own custom tokens or NFTs instead of using the default ones, follow the steps below

### Deploying CW20 (Tokens)

- Update the following files with your custom data

  - `input_arguments/instantiate_args.json`
  - `input_arguments/mint_args.json`

- Run the deployment script

  ```bash
  npx ts-node src/scripts/1-deploy-cw20.ts
  ```

### CW721

- Update the following files with your custom data

  - `input_arguments/instantiate_nft_args.json`
  - `input_arguments/mint_nft_args.json`

- Run the deployment script

  ```bash
  npx ts-node src/scripts/2-deploy-cw721.ts
  ```

## Active Contract Address

- Below are the contract addresses currently in use for this project:
  - Relayer address: [xion1y9qlye0laqgfyjhsj8ldy354qcew3qu5q6d7m8](https://testnet.xion.explorers.guru/account/xion1y9qlye0laqgfyjhsj8ldy354qcew3qu5q6d7m8)
  - CW20 Contract Address: [xion1dyxxswfl3evyhnk29agukx2jheph93sq32u4zhvh8ze7k3c6r7ms8nmgtr](https://testnet.xion.explorers.guru/account/xion1dyxxswfl3evyhnk29agukx2jheph93sq32u4zhvh8ze7k3c6r7ms8nmgtr)
  - CW721 Contract Address: [xion1w5la93s8l2tkw2pyh3mh0hngum268yu0jat9e73hsw090wnpq2ksd4845u](https://testnet.xion.explorers.guru/contract/xion1w5la93s8l2tkw2pyh3mh0hngum268yu0jat9e73hsw090wnpq2ksd4845u)

## Useful Resources

- [CW20 Smart Contract](https://github.com/CosmWasm/cw-plus)
- [CW721 Smart Contract](https://github.com/public-awesome/cw-nfts)
- [Xion Explorer](https://testnet.xion.explorers.guru/)
- [Deploy, init and interact with cw20 using wasmd](https://hackmd.io/@nabaruns/H1T9PS9D5)
- [Stargate Library](https://github.com/cosmos/cosmjs/blob/33271bc51c/packages/cosmwasm-stargate/src/signingcosmwasmclient.ts#L145):
- [Query Smart Contract](https://docs.orai.io/developer-guides/cosmwasm-contract/deploy-contract)
- Deploy [CW20](https://docs.mantrachain.io/developing-on-mantra-chain/cosmwasm-quick-start-guide/writing-and-deploying-cw20-contract), [CW721](https://docs.mantrachain.io/developing-on-mantra-chain/cosmwasm-quick-start-guide/writing-and-deploying-cw721-contract) on Mantra: You can use it as a reference to deploy on Xion as well

## CLI Command

- Before running these commands, ensure that Go is installed and properly configured.

  ```bash
  export GOPATH=$(go env GOPATH)
  export PATH=$GOPATH/bin:$PATH
  ```

### Query smart contract state

- To query the state of a smart contract, use the following command to list all tokens in the contract:

  ```bash
  xiond q wasm contract-state smart xion1w5la93s8l2tkw2pyh3mh0hngum268yu0jat9e73hsw090wnpq2ksd4845u '{"all_tokens":{}}'  --node https://rpc.xion-testnet-1.burnt.com:443
  ```

### Transfer UXION

- To transfer UXION tokens, update the placeholders $FROM_ADDR and $TO_ADDR with the sender and recipient addresses, and specify the transfer amount:

  ```bash
  xiond tx bank send  $FROM_ADDR $TO_ADDR  100000uxion --node https://rpc.xion-testnet-1.burnt.com:443 --chain-id xion-testnet-1
  ```

### Transfer CW20

```bash
cd input_arguments
```

```bash
xiond tx wasm execute xion1dyxxswfl3evyhnk29agukx2jheph93sq32u4zhvh8ze7k3c6r7ms8nmgtr "$(cat transfer_cw20_args.json)" --from xion1y9qlye0laqgfyjhsj8ldy354qcew3qu5q6d7m8 --gas auto --gas-adjustment 1.5 --gas-prices 0.025uxion --chain-id xion-testnet-1 --node https://rpc.xion-testnet-1.burnt.com:443
```

## Postman Collection

- You can download [Postman collection](202501150039-Xion.postman_collection.json) to quickly test the API.
- Update the API_URL variable in Postman to match the port your server is running on.
