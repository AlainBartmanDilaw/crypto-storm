const encryption = require('./encryption');

const text = "Master of puppets I'm pulling your strings, twisting your mind and smashing your dreams.";

const encrypted = encryption.encrypt(text);
console.log(encrypted);

const decrypted = encryption.decrypt(encrypted);
console.log(decrypted);
