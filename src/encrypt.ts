import { controlArgs } from "./ControlArgs";
import * as _encryption from "./encryption";

try {
    const myArgs: string[] = controlArgs();

    const encrypted: string = _encryption.doEncrypt(myArgs[0]);
    console.log(`${myArgs[0]} has been encrypted to [${encrypted}]`);
    const decrypted: string = _encryption.doDecrypt(encrypted);
    console.log(`${encrypted} has been decrypted to [${decrypted}]`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
