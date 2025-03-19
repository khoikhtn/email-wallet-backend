// routes.test.ts

import axios, {AxiosResponse} from "axios";
import {AccountCreationRequest, AccountCreationResponse,} from "../routes/createAccount";

describe("POST /create-account", () => {
    it("should create an account and return a signer", async () => {
        const res = await axios.post<
            AccountCreationResponse,
            AxiosResponse<AccountCreationResponse>,
            AccountCreationRequest
        >("http://localhost:3000/create-account", {
            wallet_salt_byte32: [1],
            proof: {
                email_addr_pointer:
                    "14173279942334137220153051047875524688435377838755803238289438764289764554548",
                account_key_commit:
                    "4546439420997729770760366801171660106382993189994083815773060805393185157687",
                wallet_salt:
                    "11645307337330358394156085775232506543267466701022933613610565396010094018508",
                psi_point: [
                    "16190729713555891796124172902401997083132571090712478508749524955994059819467",
                    "513507308524601422666219749690522073791387788801597937031774300495452961060",
                ],
                proof: {
                    pi_a: [
                        "15667991451084203135842214418274044746415228686680607213300256713934274025",
                        "16420099176460645797857596314399183692480988375105246233984376591924741730954",
                    ],
                    pi_b: [
                        [
                            "14069042424375688912940786830845726509634682192233570256650096195882523772238",
                            "14766492818487001154161560044394021340925314571413688331618486581102192900723",
                        ],
                        [
                            "9326411115847864522892040876914271202958816187586632880905655304019455057350",
                            "2763427823873806702840417691613348016233722269840014653985582120557820075587",
                        ],
                    ],
                    pi_c: [
                        "8033360682341316125734842556994411540415710574394389377852915457621158475816",
                        "17275843055198325036192322960154758259155032495925001722114260411523773044710",
                    ],
                },
            },
        });
        const {data} = res;
        expect(res.status).toEqual(200);
        expect(data.user_addr).toEqual(
            "nibi1xx6due8t4r5lv0nceld5rdd4ug64nt49g06rpg"
        );
    });

    it("should return an error when wallet_salt is invalid", async () => {
        const res = await fetch("http://localhost:3000/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wallet_salt: [1, 2, 3], // Invalid data
            }),
        });

        const data = await res.text();

        expect(res.status).toEqual(200);
        expect(data).toEqual("Invalid wallet salt");
    });
});

describe("POST /transfer", () => {
    it("should transfer tokens from one account to another", async () => {
        const res = await axios.post(
            "http://localhost:3000/transfer-token",
            {
                wallet_salt: [
                    25, 191, 2, 168, 5, 208, 103, 64, 153, 98, 46, 243, 144, 13, 115, 45,
                    37, 88, 27, 43, 37, 45, 30, 186, 106, 170, 64, 172, 217, 123, 191,
                    204,
                ],
                toAddress: "xion1pcgpfanmtqcv40h2ay3gl74r7wj2ajdwm0xdc9",
                denom: "uxion",
                amount: 5,
            },
            {
                timeout: 100000,
            }
        );
        const {data} = res;
        expect(res.status).toEqual(200);
        expect(data.txHash).not.toEqual(0);
    });
});

describe("POST/ verify", () => {
    it("should verify the create account", async () => {
        const res = await axios.post(
            "http://localhost:3000/verify-create-account",
            {
                wallet_salt: [
                    25, 191, 2, 168, 5, 208, 103, 64, 153, 98, 46, 243, 144, 13, 115, 45,
                    37, 88, 27, 43, 37, 45, 30, 186, 106, 170, 64, 172, 217, 123, 191,
                    204,
                ],
            },
            {
                timeout: 1000000,
            }
        );
        const {data} = res;
        console.log(data.txHash);
    });
});
