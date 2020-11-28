'use strict';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16
const ERROR_MESSAGE = "The encryption key must be defined with 32 characters length string. Set first environment variable ENCRYPTION_KEY.";

function getEncryptionKey() {
    if (process.env.ENCRYPTION_KEY.length !== 32) {
        throw ERROR_MESSAGE;
    }
    return process.env.ENCRYPTION_KEY.trimRight();
}

// Our encryption key.
// It's often generated randomly but it must be the same for decryption
// Set first environment variable ENCRYPTION_KEY
const ENCRYPTION_KEY = getEncryptionKey();

//Encryption algorithm
const algorithm = 'aes-256-cbc';

function doEncrypt(text) {

    if (ENCRYPTION_KEY === undefined) {
        throw ERROR_MESSAGE;
    }

    let iv = crypto.randomBytes(IV_LENGTH).slice(0, 16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function doDecrypt(text) {
    if (ENCRYPTION_KEY === undefined) {
        throw ERROR_MESSAGE;
    }

    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = {doDecrypt, doEncrypt};
