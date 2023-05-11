'use strict';
import crypto from "crypto"

const IV_LENGTH = 16; // For AES, this is always 16
//Encryption algorithm
const algorithm = 'aes-256-cbc';

export class _encryption {

    static doEncrypt(text, keyString) {

        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(keyString), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        // console.log(encrypted.length)
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    static doDecrypt(text, keyString) {

        let textParts = text.split(':');

        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.shift(), 'hex');

        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keyString), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

