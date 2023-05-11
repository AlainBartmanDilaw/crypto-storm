import crypto from "crypto"

const IV_LENGTH = 16;
//Encryption algorithm
const algorithm = "aes-256-cbc";
const encoding1 = "utf8";
const encoding2 = "base64";
export class AES
{
    static Encrypt(plainText, keyString)
    {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(algorithm, keyString, iv);
        let encrypted = cipher.update(Buffer.from(plainText, encoding1));
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        // console.log( iv.toString('hex') + ':' + encrypted.toString('hex') );

        const combinedData = Buffer.concat([iv, encrypted]);
        const combinedString = combinedData.toString(encoding2);
        // console.log(combinedString.length)
        return combinedString;
        // return iv.toString('hex') + ':' + encrypted.toString('hex');

    }

    static Decrypt(combinedString, keyString)
    {
        const combinedData = Buffer.from(combinedString, encoding2);
        const iv = Buffer.alloc(IV_LENGTH);
        const cipherText = Buffer.alloc(combinedData.length - iv.length);
        combinedData.copy(iv, 0, 0, iv.length);
        combinedData.copy(cipherText, 0, iv.length);
        const decipher = crypto.createDecipheriv(algorithm, keyString, iv);
        let plainText = decipher.update(cipherText);
        plainText += decipher.final(encoding1);
        return plainText;
    }
}
