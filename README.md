# Character string cryptography module

Allows encryption and decryption, knowing the key.
This must imperatively be valued in the environment variable ENCRYPTION_KEY

# Example syntax

> ENCRYPTION_KEY='hCGTd)qSb@ZfAtvPfy^w3$#gN/KCsN.w' node encrypt.ts "Something"

should return something like this :

> ENCRYPTION_KEY='hCGTd)qSb@ZfAtvPfy^w3$#gN/KCsN.w' node encrypt.ts "Something"
>
> Something has been encrypted to 14398958d684ad2d6840b7a543e29df0:ecfcf677d6cc943bb850493ef60d99ec

# Notices

## Encryption key

### Key length

The encryption key must have exactly 32 characters

### Note about # character

If your encryption key includes # character, you have to escape the character with "\"
or surround your key with single or double quote (' or ")

If not, the # character will be interpreted as start of a comment, cutting your encryption key

## Return values

Each launch will provide a different return value

# Sources

https://github.com/AlainBartmanDilaw/crypto-storm
