import path from "path";

export function controlArgs() {

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

    return myArgs;
}
