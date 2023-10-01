import {_encryption} from "./encryption.js";
import {controlArgs} from "./ControlArgs.js";
import {ENCRYPTION_KEY} from "./Encryption_Key.js";

try {
    const myArgs = controlArgs();

    const encrypted = _encryption.doEncrypt(myArgs[0], ENCRYPTION_KEY);
    const decrypted = _encryption.doDecrypt(encrypted, ENCRYPTION_KEY);
    console.log(`${decrypted} has been encrypted to [${encrypted}]`);

    const res = _encryption.doDecrypt("18154170f8662176f2877e925e906f78:42134eb49cffa2163d53f7135b4b7d91",ENCRYPTION_KEY );
    console.log('2', res)

} catch (e) {
    console.error(e);
    process.exit(1);
}
