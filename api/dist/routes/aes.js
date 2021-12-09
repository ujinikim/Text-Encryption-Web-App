"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptFile = exports.encryptFile = void 0;
const aes256 = require('aes256');
const fs_1 = __importDefault(require("fs"));
function encryptFile(filePath, key) {
    key = validateKey(key);
    try {
        const file = fs_1.default.readFileSync(filePath);
        const encrypted = aes256.encrypt(key, file);
        fs_1.default.writeFileSync(filePath, encrypted);
        console.log("Encrypting file with AES 256 and given key");
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.encryptFile = encryptFile;
function decryptFile(filePath, key) {
    key = validateKey(key);
    try {
        const file = fs_1.default.readFileSync(filePath);
        const decrypted = aes256.decrypt(key, file);
        fs_1.default.writeFileSync(filePath, decrypted);
        console.log("Decrypting file with AES 256 and given key");
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.decryptFile = decryptFile;
function validateKey(key) {
    if (key === "" || key.length == 0) {
        return "SUPERSTRONGKEY12345";
    }
    return key;
}
