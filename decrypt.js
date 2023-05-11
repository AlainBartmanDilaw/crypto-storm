import {controlArgs} from "./ControlArgs.js";
import {_encryption} from "./encryption.js";
import {ENCRYPTION_KEY} from "./Encryption_Key.js";

try {
    const myArgs = controlArgs();

    const decrypted = _encryption.doDecrypt(myArgs[0], ENCRYPTION_KEY);
    console.log(`${myArgs[0]} has been decrypted to ${decrypted}`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
