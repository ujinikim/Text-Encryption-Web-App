const aes256 = require('aes256');
const fs = require('fs');

filePath = process.argv[2];
key = process.argv[3];

return decrypt(filePath, key);

function decrypt(filePath, key) {
    const data = fs.readFileSync(filePath);
    const decrypted = aes256.decrypt(key, data);
    fs.writeFileSync("decrypted_" + filePath, decrypted);
}