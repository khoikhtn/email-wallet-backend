import {bytes32} from "../interfaces/alias";

export function bufferFromByte32(byte: bytes32): Buffer {
    if (byte.length != 32) {
        throw Error("Byte length must be 32");
    }
    return Buffer.from(byte);
}
