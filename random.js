const crypto = require('crypto');

/**
 * getRandomBytes - compute and calculate random hexadecimal sized string
 * @param {number} length Length of the result string.
 */
function getRandomBytes(length = 32) {

    const buf = crypto.randomBytes(length);
    return buf.toString('hex');
}

module.exports = {
    getRandomBytes: getRandomBytes
};
