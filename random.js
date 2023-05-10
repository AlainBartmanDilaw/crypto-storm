const crypto = require('crypto');

function getRandomBytes(length = 32) {
    const byteLength = Math.ceil(length / 2);
    const bytes = new Uint8Array(byteLength);
    crypto.getRandomValues(bytes);
    return Array
        .from(bytes, byte => (`0${byte.toString(16)}`)
        .slice(-2))
        .join('')
        .slice(0, length)
        ;
}

module.exports = {
    getRandomBytes: getRandomBytes
};
