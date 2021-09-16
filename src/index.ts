import {ITranslation} from "./interfaces/ITranslation";

import {English} from "./i18n/en";
import {Bulgarian} from "./i18n/bg";

export enum Language {
    EN = "en",
    BG = "bg",
    PT = "pt"
}

type Options = {
    gender: 'male' | 'female' | 'neutral';
    useUnitySeparator?: boolean;
}

export class Wordify {
    private number = "";
    private firstIteration = true;

    private convert(n: string, lang: ITranslation, options: Options = {
        gender: 'male',
        useUnitySeparator: true
    }): string {
        const number = Number(n);
        const length = n.length;
        let separator = ' ';
        n = number.toString();

        if(!this.firstIteration && n === '0') return '';
        this.firstIteration = false

        //Edge cases

        //1. Lower than 20
        if (number < 20) {
            const response = lang.units[number]
            return typeof response === 'string' ? response : response[options.gender]!;
        }

        //1. Lower than 100
        if (number < 100) {
            separator = lang.unitSeparator ?? " ";
            const tens = lang.tens[n[0].padEnd(2, '0')];

            const rest = this.convert(n.substr(1), lang, options);

            if(rest)
                return (typeof tens === 'string' ? tens : tens[options.gender]!) + separator + rest
            return (typeof tens === 'string' ? tens : tens[options.gender]!)
        }

        //1. Lower than 1000
        if (number < 1000) {
            let hundreds = lang.hundreds[n[0].padEnd(3, '0')];

            if (!hundreds) {
                let unity = lang.units[n[0]];
                const isBiggerThanOne = Number(n[0]) > 1;
                unity = typeof unity === 'string' ? unity : unity[options.gender]!

                const findElement = lang.other.find(o => o.exponent === 2)!;
                const result = findElement.all ?? (isBiggerThanOne ? findElement.plural : findElement.singular);
                const hundred = typeof result === 'string' ? result : result![options.gender];

                hundreds = `${unity} ${hundred}`
            }
            const rest = n.substr(1);
            const restNumber = Number(rest);

            const result = this.convert(rest, lang, options)

            if(result.split(" ").length === 1)
                separator = lang.orderSeparator ?? lang.unitSeparator ?? " "

            if (restNumber > 0)
                return (typeof hundreds === 'string' ? hundreds : hundreds[options.gender]!) + separator + result
            return (typeof hundreds === 'string' ? hundreds : hundreds[options.gender]!)
        }
        //end edge cases

        //Get the order
        const sorted = lang.other.sort((a, b) => a.exponent - b.exponent)
        const orderAbove = sorted.findIndex(o => o.exponent >= length)
        const order = sorted[orderAbove - 1];

        //Get the first part, like scientific notation
        const multiplier = n.substr(0, n.length - order.exponent);
        let result = '';

        //Check for plural
        if (order.all) {
            if (typeof order.all === 'string') result = order.all
            else result = order.all[options.gender]!
        } else if (Number(multiplier) > 1) {
            if (typeof order.plural === 'string') result = order.plural
            else if (order.plural) result = order.plural[options.gender]!
        } else {
            if (typeof order.singular === 'string') result = order.singular
            else if (order.singular) result = order.singular[options.gender]!
        }

        //Get Rest
        const rest = n.substr(multiplier.length);
        const restNumber = Number(rest);
        const r = this.convert(rest, lang, options)

        //Check for ligature condition
        // 1. The rest is bigger than 0
        // 2. The rest is one order smaller then the number
        if (restNumber > 0) {
            if (restNumber < Math.pow(10, order.exponent) && restNumber % Math.pow(10, order.exponent - 1) === 0
                || r.split(" ").length === 1) {
                separator = lang.orderSeparator ?? lang.unitSeparator ?? " "
            }
        }

        //Add the rest if it exists
        if (Number(rest) > 0) return `${this.convert(multiplier, lang, options)} ${result}${separator}${this.convert(rest, lang, options)}`
        return `${this.convert(multiplier, lang, options)}${separator}${result}`
    }

    public static from(number: string | number): Wordify {
        if (Number.isNaN(number))
            throw new Error('Input is not a number')

        const instance = new Wordify()
        instance.number = number.toString().trim()

        return instance
    }

    public toWords(language: Language = Language.EN, options?: Options): string {
        let lang: ITranslation;

        switch (language) {
            case Language.BG:
                lang = Bulgarian;
                break;
            case Language.EN:
                lang = English;
                break;
            default:
                lang = English
                break;
        }

        let value = this.convert(this.number, lang, options)

        if(lang.exceptions && lang.exceptions.length > 0) {
            lang.exceptions
                .filter(e => e.type === 'post')
                .forEach(e => {
                    value = e.func(value, Number(this.number))
                })
        }

        return value
    }
}