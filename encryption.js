'use strict';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16

// Notre clé de chiffrement, elle est souvent générée aléatoirement mais elle doit être la même pour le décryptage
// A passer en variable environnement
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// On définit notre algorithme de cryptage
const algorithm = 'aes-256-cbc';

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = { decrypt, encrypt };
