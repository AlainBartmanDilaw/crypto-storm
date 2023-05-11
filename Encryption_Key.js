const ERROR_MESSAGE = "The encryption key must be defined with 32 characters length string. Set first environment variable ENCRYPTION_KEY.";

function getEncryptionKey() {
    // console.log(`Key = [${process.env.ENCRYPTION_KEY}]`);
    // console.log(`Key length = ${process.env.ENCRYPTION_KEY.length}`);
    if (process.env.ENCRYPTION_KEY === undefined) {
        throw ERROR_MESSAGE;
    }

    if (process.env.ENCRYPTION_KEY.length !== 32) {
        throw ERROR_MESSAGE;
    }
    return process.env.ENCRYPTION_KEY.trimRight();
}

// Our encryption key.
// It's often generated randomly, but it must be the same for decryption
// Set first environment variable ENCRYPTION_KEY
export const ENCRYPTION_KEY = getEncryptionKey();
