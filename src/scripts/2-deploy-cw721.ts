const fs = require("fs");
require("dotenv").config();

import {setUpClient} from "../global";
import {ENV_KEY, getEnv} from "../utils/config";
import {importMnemonic} from "../utils/wallet";

import instantiate_args from "../../input_arguments/instantiate_nft_args.json";
import mint_cw721_args from "../../input_arguments/mint_nft_args.json";

const contractWasmPath = process.env.CONTRACT_CW721_PATH; // Path to your compiled  contract (wasm file)

async function deploy() {
    // Step 1: Set up wallet and client
    const wallet = await importMnemonic(getEnv(ENV_KEY.MNEMONIC));

    // Step 2: Connect to the blockchain
    const {client, address} = await setUpClient();

    console.log(`Wallet address: ${address}`);

    console.log("Connected to blockchain");

    // Step 3: Upload contract
    const wasmCode = fs.readFileSync(contractWasmPath); // wasm file
    const uploadReceipt = await client.upload(
        address,
        wasmCode,
        "auto",
        "Upload CosmWasm contract"
    );
    const codeId = uploadReceipt.codeId;
    console.log(`Contract uploaded with Code ID: ${codeId}`);

    // Step 4: Instantiate contract
    const instantiateReceipt = await client.instantiate(
        address,
        codeId,
        instantiate_args,
        "My CW721 contract",
        "auto"
    );
    const contractAddress = instantiateReceipt.contractAddress;
    console.log(`Contract instantiated at address: ${contractAddress}`);

    const executeTx = await client.execute(
        address,
        contractAddress,
        mint_cw721_args,
        "auto"
    );
    console.log("executed successfully", executeTx);
}

deploy().catch(console.error);
