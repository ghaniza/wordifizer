"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bulgarian = void 0;
exports.Bulgarian = {
    separator: ' и ',
    ignoreHundredsSeparator: true,
    units: {
        0: 'нула',
        1: {
            male: 'един',
            female: 'една',
            neutral: 'едно'
        },
        2: {
            male: 'два',
            female: 'две',
            neutral: 'две'
        },
        3: "три",
        4: "четири",
        5: "пет",
        6: "шест",
        7: "седем",
        8: "осем",
        9: "девет",
        10: "десет",
        11: "единадесет",
        12: "дванадесет",
        13: "тринадесет",
        14: "четиринадесет",
        15: "петнадесет",
        16: "шестнадесет",
        17: "седемнадесет",
        18: "осемнадесет",
        19: "деветнадесет",
    },
    tenths: {
        20: "двадесет",
        30: "тридесет",
        40: "четиридесет",
        50: "петдесет",
        60: "шестдесет",
        70: "седемдесет",
        80: "осемдесет",
        90: "деветдесет",
    },
    hundreds: {
        100: "сто",
        200: "двеста",
        300: "триста",
        400: "четиристотин",
        500: "петстотин",
        600: "шестстотин",
        700: "седемстотин",
        800: "осемстотин",
        900: "деветстотин",
    },
    other: [
        {
            exponent: 2,
            all: 'сто'
        },
        {
            exponent: 3,
            singular: "хиляда",
            plural: "хиляди"
        },
        {
            exponent: 6,
            singular: "милион",
            plural: "милиона"
        },
        {
            exponent: 9,
            singular: "милиард",
            plural: "милиарда"
        },
        {
            exponent: 12,
            singular: "трилион",
            plural: "трилиона"
        },
        {
            exponent: 15,
            singular: "квадрилион",
            plural: "квадрилиона"
        },
        {
            exponent: 18,
            singular: "квинтилион",
            plural: "квинтилиони"
        },
    ],
    exceptions: [
        {
            type: 'post',
            func: function (value) {
                return value.replace(new RegExp('(един|еднa|еднo) хиляда', 'gi'), 'хиляда');
            }
        },
        {
            type: 'post',
            func: function (value) {
                return value.replace(new RegExp('(един|едно) хиляди', 'gi'), 'една хиляди');
            }
        },
        {
            type: 'post',
            func: function (value) {
                return value.replace(new RegExp('два хиляди', 'gi'), 'две хиляди');
            }
        }
    ]
};
//# sourceMappingURL=bg.js.map