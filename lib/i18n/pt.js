"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portuguese = void 0;
exports.Portuguese = {
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
        3: "tres",
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
        14: "catorze",
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
            singular: "milhao",
            plural: "milhoes"
        },
        {
            exponent: 9,
            singular: "bilhao",
            plural: "bilhoes"
        },
        {
            exponent: 12,
            singular: "trilhao",
            plural: "trilhoes"
        },
        {
            exponent: 15,
            singular: "quadrilhao",
            plural: "quadrilhoes"
        },
        {
            exponent: 18,
            singular: "quintilhao",
            plural: "quintilhoes"
        },
    ],
    exceptions: [
        {
            type: 'post',
            func: function (value) {
                return value
                    .replace(/\bum mil\b/gi, 'mil')
                    .replace(/\bum cem\b/gi, 'cento');
            }
        }
    ]
};
//# sourceMappingURL=pt.js.map