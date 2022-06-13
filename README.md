# Character string cryptography module

Allows encryption and decryption, knowing the key.
This must imperatively be valued in the environment variable ENCRYPTION_KEY

# Example syntax

ENCRYPTION_KEY='hCGTd)qSb@ZfAtvPfy^w3$#gN/KCsN.w' node index.js "String to encrypt"

should return something like this :

String to encrypt has been encrypted to 5023f31caa02fe3b40bb6e51f3f17288:de33795fed2db4cdca185307d548c771013557bb4f34726f456c24f1c1ac9d9e

#  Notices
## Key length
The encryption key must have exactly 32 characters

## Return values 
Each launch will provide a different return value

# Sources
https://github.com/AlainBartmanDilaw/crypto-storm
