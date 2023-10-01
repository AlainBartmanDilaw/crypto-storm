'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.doDecrypt = exports.doEncrypt = void 0;
var crypto = require("crypto");
var IV_LENGTH = 16; // For AES, this is always 16
var SETFIRST_MESSAGE = "Set first environment variable ENCRYPTION_KEY.";
var ERROR_MESSAGE = "The encryption key must be defined with 32 characters length string.";
var UNDEFINED_MESSAGE = "The variable ENCRYPTION_KEY must be defined before any decrypt action.";
var NO_UNDEFINED_TEXT = "The text you want to crypt or decrypt cannot be undefined or empty.";
//Encryption algorithm
var algorithm = 'aes-256-cbc';
var encoding = 'hex';
var hashData = {
    data: 'crypto-storm',
    algo: 'sha256'
};
function getEncryptionKey() {
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
var key = getEncryptionKey();
function doEncrypt(text) {
    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }
    var iv = crypto.randomBytes(IV_LENGTH).slice(0, 16);
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString(encoding) + ':' + encrypted.toString(encoding);
}
exports.doEncrypt = doEncrypt;
function doDecrypt(text) {
    var _a;
    if (text === undefined || text === "") {
        throw NO_UNDEFINED_TEXT;
    }
    var textParts = text.split(':');
    var fromShift = (_a = textParts.shift()) !== null && _a !== void 0 ? _a : "";
    var iv = Buffer.from(fromShift, encoding);
    var encryptedText = Buffer.from(textParts.join(':'), encoding);
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    var decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
}
exports.doDecrypt = doDecrypt;
