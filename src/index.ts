import {ITranslation} from "./interfaces/ITranslation";
import crypto from "crypto"
import fs from 'fs'

import {English} from "./i18n/en";
import {Bulgarian} from "./i18n/bg";
import {Portuguese} from "./i18n/pt";
import {IOptions} from "./interfaces/IOptions";
import {DEFAULT_OPTIONS, ERROR} from "./constants";

export enum Language {
    EN = "en",
    BG = "bg",
    PT = "pt"
}

export class Wordify {
    protected number = "";
    protected firstIteration = true;
    protected lang: ITranslation = English;
    protected options: IOptions = DEFAULT_OPTIONS;

    protected isLessThan20(n: string): string {
        if (Number(n) >= 20) return ""

        const response = this.lang.units[n]

        if (!response) throw new Error(ERROR.MISSING_PROPERTY)

        if (typeof response === 'string') return response;

        if (!this.options.gender)
            throw new Error(ERROR.INVALID_GENDER)

        return response[this.options.gender]!;
    }

    protected isLessThan100(n: string): string {
        if (Number(n) >= 100) return ""

        const separator = this.lang.unitSeparator ?? this.lang.separator ?? " ";
        const tens = this.lang.tenths[n[0].padEnd(2, '0')];

        if (!tens) throw new Error(ERROR.MISSING_PROPERTY)

        const rest = this.convert(n.substr(1));

        if (!rest) {
            if (typeof tens === 'string') return tens

            if (this.options.gender && tens[this.options.gender])
                return tens[this.options.gender]!

            throw new Error(ERROR.MISSING_GENDER)
        }

        if (typeof tens === 'string') {
            return tens + separator + rest
        } else {
            if (this.options.gender)
                return tens[this.options.gender]!
        }

        return ""
    }

    protected isLessThan1000(n: string): string {
        if (Number(n) >= 1000) return ""

        let hundreds = this.lang.hundreds[n[0].padEnd(3, '0')];

        if (!hundreds) {
            let unity = this.lang.units[n[0]];
            const isBiggerThanOne = Number(n[0]) > 1;
            unity = typeof unity === 'string' ? unity : unity[this.options.gender]!

            const findElement = this.lang.other.find(o => o.exponent === 2)!;
            const result = findElement.all ?? (isBiggerThanOne ? findElement.plural : findElement.singular);
            const hundred = typeof result === 'string' ? result : result![this.options.gender];

            hundreds = `${unity} ${hundred}`
        }
        const rest = n.substr(1);
        const overflow = Number(rest);

        const result = this.convert(rest)

        let separator = " ";
        const definedSeparator = this.lang.orderSeparator ?? this.lang.separator;

        let wordsSoFar: string[];

        if (definedSeparator && !this.lang.ignoreHundredsSeparator)
            wordsSoFar = result.replace(new RegExp(definedSeparator, 'i'), "").split(" ")
        else
            wordsSoFar = result.split(" ")

        if (wordsSoFar.length === 1 && !!wordsSoFar[0])
            separator = this.lang.orderSeparator ?? this.lang.separator ?? " "

        if (overflow > 0)
            return (typeof hundreds === 'string' ? hundreds : hundreds[this.options.gender]!) + separator + result
        return (typeof hundreds === 'string' ? hundreds : hundreds[this.options.gender]!)
    }

    protected convert(n: string): string {
        const number = Number(n);
        const length = n.length;
        n = number.toString();

        if (!this.firstIteration && n === '0') return '';
        this.firstIteration = false

        let res = '';
        if (res = this.isLessThan20(n)) return res
        if (res = this.isLessThan100(n)) return res
        if (res = this.isLessThan1000(n)) return res

        const sorted = this.lang.other.sort((a, b) => a.exponent - b.exponent)
        const orderAbove = sorted.findIndex(o => o.exponent >= length)
        const order = sorted[orderAbove - 1];

        const multiplier = n.substr(0, n.length - order.exponent);
        let result = '';

        if (order.all) {
            if (typeof order.all === 'string') result = order.all
            else result = order.all[this.options.gender]!
        } else if (Number(multiplier) > 1) {
            if (typeof order.plural === 'string') result = order.plural
            else if (order.plural) result = order.plural[this.options.gender]!
        } else {
            if (typeof order.singular === 'string') result = order.singular
            else if (order.singular) result = order.singular[this.options.gender]!
        }

        let separator = " "
        const other = n.substr(multiplier.length);
        const overflow = Number(other);

        if (overflow > 0) {
            const rest = this.convert(other)

            if ((overflow < Math.pow(10, order.exponent) && overflow % Math.pow(10, order.exponent - 1) === 0) || rest.split(" ").length === 1) {
                separator = this.lang.orderSeparator ?? this.lang.separator ?? " "
            }

            return `${this.convert(multiplier)} ${result}${separator}${this.convert(other)}`
        }

        return `${this.convert(multiplier)}${separator}${result}`
    }

    public static from(number: string | number): Wordify {
        if (Number.isNaN(number))
            throw new Error('Input is not a number')

        const instance = new Wordify()
        instance.number = number.toString().trim()

        return instance
    }

    public toWords(language: Language = Language.EN, options?: IOptions): string {
        if (options) this.options = options

        switch (language) {
            case Language.BG:
                this.lang = Bulgarian;
                break;
            case Language.EN:
                this.lang = English;
                break;
            case Language.PT:
                this.lang = Portuguese;
                break;
            default:
                this.lang = English
                break;
        }

        let value = this.convert(this.number)

        if (this.lang.exceptions && this.lang.exceptions.length > 0) {
            this.lang.exceptions
                .filter(e => e.type === 'post')
                .forEach(e => {
                    value = e.func(value, Number(this.number))
                })
        }

        return value
    }
}
