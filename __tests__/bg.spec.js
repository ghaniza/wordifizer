"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Bulgarian', function () {
    it('Should return 325446 accordingly', function () {
        var word = src_1.Wordify.from(325446).toWords(src_1.Language.BG);
        expect(word).toEqual('триста двадесет и пет хиляди четиристотин четиридесет и шест');
    });
    it('Should return 100001 accordingly', function () {
        var word = src_1.Wordify.from(100001).toWords(src_1.Language.BG);
        expect(word).toEqual('сто хиляди и един');
    });
    it('Should return 502 accordingly', function () {
        var word = src_1.Wordify.from(502).toWords(src_1.Language.BG);
        expect(word).toEqual('петстотин и два');
    });
    it('Should return 105060 accordingly', function () {
        var word = src_1.Wordify.from(105060).toWords(src_1.Language.BG);
        expect(word).toEqual('сто и пет хиляди и шестдесет');
    });
    it('Should return 1500 accordingly', function () {
        var word = src_1.Wordify.from(1500).toWords(src_1.Language.BG);
        expect(word).toEqual('хиляда и петстотин');
    });
});
//# sourceMappingURL=bg.spec.js.map