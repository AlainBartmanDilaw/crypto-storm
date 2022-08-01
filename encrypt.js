try {
    const _encryption = require('./encryption');
    const fs = require('fs');
    const path = require("path");

    const currentPath = process.cwd();
    let myArgs = process.argv;
    const node = path.basename(myArgs[0], '.exe');
    const arg1 = myArgs[1];
    const app = path.dirname(arg1).replace(currentPath, '').replace(/^\\/g, '') + path.basename(arg1);
    const syntaxe = `Syntax :
${node} ${app} "string to encrypt"`;

    myArgs = myArgs.slice(2); // Suppressing the 2 first command line arguments (node + program-name)
    if (myArgs.length !== 1) {

        throw `A string to encrypt must be add as parameter\n${syntaxe}`;
    }

    const encrypted = _encryption.doEncrypt(myArgs[0]);
    const decrypted = _encryption.doDecrypt(encrypted);
    console.log(`${decrypted} has been encrypted to ${encrypted}`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
