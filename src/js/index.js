import {AES} from "./AES.js";
import {controlArgs} from "../ControlArgs.ts";
import {ENCRYPTION_KEY} from "./Encryption_Key.js";

try {
    const myArgs = controlArgs();

    const encrypted = AES.Encrypt(myArgs[0], ENCRYPTION_KEY);
    const decrypted = AES.Decrypt(encrypted, ENCRYPTION_KEY);
    console.log(`[${decrypted}] has been encrypted to [${encrypted}]`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
