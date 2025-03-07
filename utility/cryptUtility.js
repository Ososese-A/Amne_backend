require('dotenv').config();
const crypto = require('crypto');

function encrypt(data) {
    const key = Buffer.from(process.env.CRYPT_KEY, 'utf8');
    const iv = Buffer.from(process.env.CRYPT_IV, 'utf8');
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decrypt(encrypted) {
    const key = Buffer.from(process.env.CRYPT_KEY, 'utf8');
    const iv = Buffer.from(process.env.CRYPT_IV, 'utf8');
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function isBase64(str) {
    const base64Pattern = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
    return base64Pattern.test(str) && (str.length % 4 === 0);
}

function isEncrypted(str) {
    try {
        const decrypted = decrypt(str);
        // Optionally check if the decrypted data is valid (e.g., JSON.parse for JSON data)
        return true; // Successfully decrypted, so it is encrypted
    } catch (e) {
        return false; // Failed to decrypt, so it may not be encrypted
    }
}

function isPotentiallyEncrypted(str) {
    return isBase64(str) && isEncrypted(str);
}

module.exports = { encrypt, decrypt, isPotentiallyEncrypted };


// // Example usage:
// const testEncryptedString = encrypt("Hello, World!");
// console.log("Encrypted:", testEncryptedString);
// console.log("Decrypted:", decrypt(testEncryptedString));


// // Example usage
// const key = crypto.randomBytes(32); // Use a 32-byte key for aes-256-cbc
// const iv = crypto.randomBytes(16); // Use a 16-byte IV for aes-256-cbc

// const data = 'Hello, World!';
// const encrypted = encrypt(data, key, iv);
// const decrypted = decrypt(encrypted, key, iv);

// console.log('Encrypted:', encrypted);
// console.log('Decrypted:', decrypted);