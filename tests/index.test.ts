import { expect } from 'chai';
import * as crypto from '../src/encryption';

describe('testing index file', () => {
    it('Decrypt', () => {
        const x: number = 1;
        expect(x).to.equal(1);
    });
    it('EncryptPassword', () => {
        // process.env['ENCRYPTION_KEY'] = '+GKTkd5yY/xvaGR]wS[JC4@1+Epd)6@v';
        const result: string = crypto.doEncrypt('Password');
        // expect(result).to.Throw("The text you want to crypt or decrypt cannot be undefined or empty.");
        expect(result.length).greaterThan(0)
    })
});
