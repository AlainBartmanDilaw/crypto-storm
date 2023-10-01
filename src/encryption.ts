'use strict';

import * as crypto from 'crypto';

const IV_LENGTH: number = 16; // For AES, this is always 16
const SETFIRST_MESSAGE: string = "Set first environment variable ENCRYPTION_KEY."
const ERROR_MESSAGE: string = "The encryption key must be defined with 32 characters length string.";
const UNDEFINED_MESSAGE: string = "The variable ENCRYPTION_KEY must be defined before any decrypt action.";
const NO_UNDEFINED_TEXT: string = "The text you want to crypt or decrypt cannot be undefined or empty.";

function getEncryptionKey(): string {
    if (process.env.ENCRYPTION_KEY === undefined) {
        throw UNDEFINED_MESSAGE + " " + SETFIRST_MESSAGE;
    }
    if (process.env.ENCRYPTION_KEY.length !== 32) {
        throw ERROR_MESSAGE + " " + SETFIRST_MESSAGE;
    }
    return process.env.ENCRYPTION_KEY.trimEnd();
}

// Our encryption key.
// It's often generated randomly but it must be the same for decryption
// Set first environment variable ENCRYPTION_KEY
const ENCRYPTION_KEY: string = getEncryptionKey();

//Encryption algorithm
const algorithm: string = 'aes-256-cbc';

function doEncrypt(text: string): string {

    if (ENCRYPTION_KEY === undefined) {
        throw ERROR_MESSAGE;
    }

    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }

    let iv: Buffer = crypto.randomBytes(IV_LENGTH).slice(0, 16);
    let cipher: crypto.Cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted: Buffer = cipher.update(text);

    encrypted = Buffer.concat([ encrypted, cipher.final() ]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function doDecrypt(text: string): string {
    if (ENCRYPTION_KEY === undefined) {
        throw ERROR_MESSAGE;
    }

    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }

    let textParts: string[] = text.split(':');
    let iv: Buffer = Buffer.from(textParts.shift(), 'hex');
    let encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex');
    let decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted: Buffer = decipher.update(encryptedText);

    decrypted = Buffer.concat([ decrypted, decipher.final() ]);

    return decrypted.toString();
}

module.exports = {
    doDecrypt: doDecrypt,
    doEncrypt: doEncrypt
};
