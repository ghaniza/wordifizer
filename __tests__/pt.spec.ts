import {Language, Wordify} from "../src";

describe('English', () => {

    it('Should return 29 accordingly', () => {
        const word = Wordify.from(29).toWords(Language.PT);
        expect(word).toEqual('vinte e nove')
    })

    it('Should return 51 accordingly', () => {
        const word = Wordify.from(51).toWords(Language.PT);
        expect(word).toEqual('cinquenta e um')
    })

    it('Should return 325446 accordingly', () => {
        const word = Wordify.from(325446).toWords(Language.PT);
        expect(word).toEqual('trezentos e vinte e cinco mil quatrocentos e quarenta e seis')
    })

    it('Should return 1 accordingly', () => {
        const word = Wordify.from(1).toWords(Language.PT);
        expect(word).toEqual('um')
    })

    it('Should return 3529 accordingly', () => {
        const word = Wordify.from(3529).toWords(Language.PT);
        expect(word).toEqual('tres mil quinhentos e vinte e nove')
    })

    it('Should return 10001 accordingly', () => {
        const word = Wordify.from(10001).toWords(Language.PT);
        expect(word).toEqual('dez mil e um')
    })

    it('Should return 100000 accordingly', () => {
        const word = Wordify.from(100000).toWords(Language.PT);
        expect(word).toEqual('cem mil')
    })

    it('Should return 1589632 accordingly', () => {
        const word = Wordify.from(1589632).toWords(Language.PT);
        expect(word).toEqual('um milhao quinhentos e oitenta e nove mil seiscentos e trinta e dois')
    })

    it('Should return 1500 accordingly', () => {
        const word = Wordify.from(1500).toWords(Language.PT);
        expect(word).toEqual('mil e quinhentos')
    })
})