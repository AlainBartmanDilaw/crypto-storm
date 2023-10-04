import { controlArgs } from "./ControlArgs";
import * as _encryption from "./encryption";

try {
    const myArgs: string[] = controlArgs();
    console.log('args', myArgs)

    const encrypted: string = myArgs[0]

    const decrypted: string = _encryption.doDecrypt(encrypted);
    console.log(`${encrypted} has been decrypted to [${decrypted}]`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
