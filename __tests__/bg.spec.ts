import {Language, Wordify} from "../src";

describe('Bulgarian', () => {

    it('Should return 325446 accordingly', () => {
        const word = Wordify.from(325446).toWords(Language.BG);
        expect(word).toEqual('триста двадесет и пет хиляди четиристотин четиридесет и шест')
    })

    it('Should return 100001 accordingly', () => {
        const word = Wordify.from(100001).toWords(Language.BG);
        expect(word).toEqual('сто хиляди и един')
    })

    it('Should return 502 accordingly', () => {
        const word = Wordify.from(502).toWords(Language.BG);
        expect(word).toEqual('петстотин и два')
    })

    it('Should return 105060 accordingly', () => {
        const word = Wordify.from(105060).toWords(Language.BG);
        expect(word).toEqual('сто и пет хиляди и шестдесет')
    })

    it('Should return 1500 accordingly', () => {
        const word = Wordify.from(1500).toWords(Language.BG);
        expect(word).toEqual('хиляда и петстотин')
    })

    it('Should return 60101 accordingly', () => {
        const word = Wordify.from(601001).toWords(Language.BG);
        expect(word).toEqual('шестстотин и една хиляди и един')
    })

    it('Should return 52002 accordingly', () => {
        const word = Wordify.from(52002).toWords(Language.BG);
        expect(word).toEqual('петдесет и две хиляди и два')
    })

    it('Should return 2002 accordingly', () => {
        const word = Wordify.from(2002).toWords(Language.BG);
        expect(word).toEqual('две хиляди и два')
    })

    it('Should return 51000 accordingly', () => {
        const word = Wordify.from(51000).toWords(Language.BG, {gender: 'neutral'});
        expect(word).toEqual('петдесет и една хиляди')
    })
})