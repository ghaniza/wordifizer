import {ITranslation} from "../interfaces/ITranslation";

export const Portuguese: ITranslation = {
    separator: ' e ',
    units: {
        0: 'zero',
        1: {
            male: 'um',
            female: 'uma',
            neutral: 'um'
        },
        2: {
            male: 'dois',
            female: 'duas',
            neutral: 'dois'
        },
        3: "três",
        4: "quatro",
        5: "cinco",
        6: "seis",
        7: "sete",
        8: "oito",
        9: "nove",
        10: "dez",
        11: "onze",
        12: "doze",
        13: "treze",
        14: "quatorze",
        15: "quinze",
        16: "dezesseis",
        17: "dezessete",
        18: "dezoito",
        19: "dezenove",
    },
    tens: {
        20: "vinte",
        30: "trinta",
        40: "quarenta",
        50: "cinquenta",
        60: "sessenta",
        70: "setenta",
        80: "oitenta",
        90: "noventa",
    },
    hundreds: {
        200: "duzentos",
        300: "trezentos",
        400: "quatrocentos",
        500: "quinhentos",
        600: "seiscentos",
        700: "setecentos",
        800: "oitocentos",
        900: "novecentos",
    },
    other: [
        {
            exponent: 2,
            all: 'cem'
        },
        {
            exponent: 3,
            all: "mil",
        },
        {
            exponent: 6,
            singular: "milhão",
            plural: "milhões"
        },
        {
            exponent: 9,
            singular: "bilhão",
            plural: "bilhões"
        },
        {
            exponent: 12,
            singular: "trilhão",
            plural: "trilhões"
        },
        {
            exponent: 15,
            singular: "quadrilhão",
            plural: "quadrilhões"
        },
        {
            exponent: 18,
            singular: "quintilhão",
            plural: "quintilhões"
        },
    ],
    exceptions: [
        {
            type: 'post',
            func: (value): string => {
                return value
                    .replace(/\bum mil\b/gi, 'mil')
                    .replace(/\bum cem\b/gi, 'cento')
            }
        }
    ]
}