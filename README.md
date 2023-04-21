# Character string cryptography module

Allows encryption and decryption, knowing the key.
This must imperatively be valued in the environment variable ENCRYPTION_KEY

# Example syntax

>ENCRYPTION_KEY='hCGTd)qSb@ZfAtvPfy^w3$#gN/KCsN.w' node index.js "Something"

should return something like this :

>ENCRYPTION_KEY='hCGTd)qSb@ZfAtvPfy^w3$#gN/KCsN.w' node index.js "Something"
>
> Something has been encrypted to 14398958d684ad2d6840b7a543e29df0:ecfcf677d6cc943bb850493ef60d99ec

#  Notices
## Key length
The encryption key must have exactly 32 characters

## Return values 
Each launch will provide a different return value

# Sources
https://github.com/AlainBartmanDilaw/crypto-storm
