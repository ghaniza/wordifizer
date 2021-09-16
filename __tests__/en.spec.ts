import {Wordify} from "../src";

describe('English', () => {

    it('Should return 3529 accordingly', () => {
        const word = Wordify.from(3529).toWords();
        expect(word).toEqual('three thousand five hundred and twenty-nine')
    })

    it('Should return 10001 accordingly', () => {
        const word = Wordify.from(10001).toWords();
        expect(word).toEqual('ten thousand and one')
    })

    it('Should return 100000 accordingly', () => {
        const word = Wordify.from(100000).toWords();
        expect(word).toEqual('one hundred thousand')
    })

    it('Should return 1589632 accordingly', () => {
        const word = Wordify.from(1589632).toWords();
        expect(word).toEqual('one million five hundred and eighty-nine thousand six hundred and thirty-two')
    })

    it('Should return 1500 accordingly', () => {
        const word = Wordify.from(1500).toWords();
        expect(word).toEqual('one thousand and five hundred')
    })
})