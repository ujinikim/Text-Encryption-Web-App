const aes256 = require('aes256');
import fs from 'fs';

export function encryptFile(filePath: string, key: string) {
    key = validateKey(key);
    try {
        const file = fs.readFileSync(filePath);
        const encrypted = aes256.encrypt(key, file);
        fs.writeFileSync(filePath, encrypted);
        console.log("Encrypting file with AES 256 and given key")
    } catch (e) {
        return false;
    }
    return true;
}

export function decryptFile(filePath: string, key: string) {
    key = validateKey(key);
    try {
        const file = fs.readFileSync(filePath);
        const decrypted = aes256.decrypt(key, file);
        fs.writeFileSync(filePath, decrypted);
        console.log("Decrypting file with AES 256 and given key")
    } catch (e) {
        return false;
    }
    return true;
}

function validateKey(key: string) {
    if (key === "" || key.length == 0) {
        return "SUPERSTRONGKEY12345"
    }
    return key;
}