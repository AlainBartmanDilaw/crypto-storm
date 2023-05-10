const random = require('../random')

console.log(' 1 caractère  : ', random.getRandomBytes(1));
console.log('40 caractères : ', random.getRandomBytes(40));
const defaultSize = random.getRandomBytes();
console.log('32 caractères : ', defaultSize);
console.assert(defaultSize.length === 32, 'La taille de la valeur par défaut devrait être de 32 caractères.')
