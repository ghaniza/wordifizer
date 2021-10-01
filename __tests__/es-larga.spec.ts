 import {Language, Wordify} from "../src";

describe('Spanish - Larga', () => {

    it('Should return 325446 accordingly', () => {
        const word = Wordify.from(325446).toWords(Language.ESLarga);
        expect(word).toEqual('trescientos veinticinco mil cuatrocientos cuarenta y seis')
    })

    it('Should return 10001 accordingly', () => {
        const word = Wordify.from(10001).toWords(Language.ESLarga);
        expect(word).toEqual('diez mil uno')
    })

    it('Should return 502 accordingly', () => {
        const word = Wordify.from(502).toWords(Language.ESLarga);
        expect(word).toEqual('quinientos dos')
    })

    it('Should return 105060 accordingly', () => {
        const word = Wordify.from(105060).toWords(Language.ESLarga);
        expect(word).toEqual('ciento cinco mil sesenta')
    })

    it('Should return 1500 accordingly', () => {
        const word = Wordify.from(1500).toWords(Language.ESLarga);
        expect(word).toEqual('mil quinientos')
    })

    it('Should return 60101 accordingly', () => {
        const word = Wordify.from(60101).toWords(Language.ESLarga);
        expect(word).toEqual('sesenta mil ciento uno')
    })

    it('Should return 52002 accordingly', () => {
        const word = Wordify.from(52002).toWords(Language.ESLarga);
        expect(word).toEqual('cincuenta y dos mil dos')
    })

    it('Should return 2002 accordingly', () => {
        const word = Wordify.from(2002).toWords(Language.ESLarga);
        expect(word).toEqual('dos mil dos')
    })

    it('Should return 51000 accordingly', () => {
        const word = Wordify.from(51000).toWords(Language.ESLarga);
        expect(word).toEqual('cincuenta y un mil')
    })

    it('Should return 100 accordingly', () => {
        const word = Wordify.from(100).toWords(Language.ESLarga);
        expect(word).toEqual('cien')
    })

    it('Should return 101 accordingly', () => {
        const word = Wordify.from(101).toWords(Language.ESLarga);
        expect(word).toEqual('ciento uno')
    })

    it('Should return 1265498787 accordingly', () => {
        const word = Wordify.from(1265498787).toWords(Language.ESLarga);
        expect(word).toEqual('un billón doscientos sesenta y cinco millones cuatrocientos noventa y ocho mil setecientos ochenta y siete')
    })

    it('Should return 9858746125 accordingly', () => {
        const word = Wordify.from(9858746125).toWords(Language.ESLarga);
        expect(word).toEqual('nueve billones ochocientos cincuenta y ocho millones setecientos cuarenta y seis mil ciento veinticinco')
    })

    it('Should return 2578159547853 accordingly', () => {
        const word = Wordify.from(2578159547853).toWords(Language.ESLarga);
        expect(word).toEqual('dos trillones quinientos setenta y ocho billones ciento cincuenta y nueve millones quinientos cuarenta y siete mil ochocientos cincuenta y tres')
    })
})