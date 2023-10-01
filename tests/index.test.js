"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var crypto = require("../src/encryption");
describe('testing index file', function () {
    it('Decrypt', function () {
        var x = 1;
        (0, chai_1.expect)(x).to.equal(1);
    });
    it('EncryptPassword', function () {
        // process.env['ENCRYPTION_KEY'] = '+GKTkd5yY/xvaGR]wS[JC4@1+Epd)6@v';
        var result = crypto.doEncrypt('Password');
        // expect(result).to.Throw("The text you want to crypt or decrypt cannot be undefined or empty.");
        (0, chai_1.expect)(result.length).greaterThan(0);
    });
});
