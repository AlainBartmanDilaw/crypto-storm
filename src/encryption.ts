'use strict';

import * as crypto from 'crypto';

const IV_LENGTH: number = 16; // For AES, this is always 16
const SETFIRST_MESSAGE: string = "Set first environment variable ENCRYPTION_KEY."
const ERROR_MESSAGE: string = "The encryption key must be defined with 32 characters length string.";
const UNDEFINED_MESSAGE: string = "The variable ENCRYPTION_KEY must be defined before any decrypt action.";
const NO_UNDEFINED_TEXT: string = "The text you want to crypt or decrypt cannot be undefined or empty.";

//Encryption algorithm
const algorithm: string = 'aes-256-cbc';
const encoding: BufferEncoding = 'hex';

const hashData = {
    data: 'crypto-storm',
    algo: 'sha256'
}

function getEncryptionKey(): Buffer {
    if (process.env.ENCRYPTION_KEY === undefined) {
        throw UNDEFINED_MESSAGE + " " + SETFIRST_MESSAGE;
    }
    if (process.env.ENCRYPTION_KEY.length !== 32) {
        throw ERROR_MESSAGE + " " + SETFIRST_MESSAGE;
    }
    return crypto.createHash(hashData.algo).update(hashData.data).digest();
}

// Our encryption key.
// It's often generated randomly but it must be the same for decryption
// Set first environment variable ENCRYPTION_KEY
const key: Buffer = getEncryptionKey();


export function doEncrypt(text: string): string {

    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }

    let iv: Buffer = crypto.randomBytes(IV_LENGTH).slice(0, 16);
    let cipher: crypto.Cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted: Buffer = cipher.update(text);

    encrypted = Buffer.concat([ encrypted, cipher.final() ]);

    return iv.toString(encoding) + ':' + encrypted.toString(encoding);
}

export function doDecrypt(text: string): string {
    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }

    const textParts: string[] = text.split(':');
    const iv: Buffer = Buffer.from(textParts.shift(), encoding);
    const encryptedText: Buffer = Buffer.from(textParts.join(':'), encoding);
    const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted: Buffer = Buffer.concat([ decipher.update(encryptedText), decipher.final() ]);

    return decrypted.toString();
}