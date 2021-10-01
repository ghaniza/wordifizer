"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wordify = exports.Language = void 0;
var en_1 = require("./i18n/en");
var bg_1 = require("./i18n/bg");
var pt_1 = require("./i18n/pt");
var es_larga_1 = require("./i18n/es-larga");
var es_corto_1 = require("./i18n/es-corto");
var constants_1 = require("./constants");
var Language;
(function (Language) {
    Language["EN"] = "en";
    Language["BG"] = "bg";
    Language["PT"] = "pt";
    Language["ES"] = "es";
    Language["ESLarga"] = "es-larga";
    Language["ESCorto"] = "es-corto";
})(Language = exports.Language || (exports.Language = {}));
var Wordify = (function () {
    function Wordify() {
        this.number = "";
        this.firstIteration = true;
        this.lang = en_1.English;
        this.options = constants_1.DEFAULT_OPTIONS;
    }
    Wordify.prototype.hasInUnits = function (n) {
        var response = this.lang.units[n];
        if (!response)
            return '';
        if (typeof response === 'string')
            return response;
        if (!this.options.gender)
            throw new Error(constants_1.ERROR.INVALID_GENDER);
        return response[this.options.gender];
    };
    Wordify.prototype.isLessThan100 = function (n) {
        var _a, _b;
        if (Number(n) >= 100)
            return "";
        var separator = (_b = (_a = this.lang.unitSeparator) !== null && _a !== void 0 ? _a : this.lang.separator) !== null && _b !== void 0 ? _b : " ";
        var tens = this.lang.tenths[n[0].padEnd(2, '0')];
        if (!tens)
            throw new Error(constants_1.ERROR.MISSING_PROPERTY);
        var rest = this.convert(n.substr(1));
        if (!rest) {
            if (typeof tens === 'string')
                return tens;
            if (this.options.gender && tens[this.options.gender])
                return tens[this.options.gender];
            throw new Error(constants_1.ERROR.MISSING_GENDER);
        }
        if (typeof tens === 'string') {
            return tens + separator + rest;
        }
        else {
            if (this.options.gender)
                return tens[this.options.gender];
        }
        return "";
    };
    Wordify.prototype.isLessThan1000 = function (n) {
        var _a, _b, _c, _d;
        if (Number(n) >= 1000)
            return "";
        var hundreds = this.lang.hundreds[n[0].padEnd(3, '0')];
        if (!hundreds) {
            var unity = this.lang.units[n[0]];
            var isBiggerThanOne = Number(n[0]) > 1;
            unity = typeof unity === 'string' ? unity : unity[this.options.gender];
            var findElement = this.lang.other.find(function (o) { return o.exponent === 2; });
            var result_1 = (_a = findElement.all) !== null && _a !== void 0 ? _a : (isBiggerThanOne ? findElement.plural : findElement.singular);
            var hundred = typeof result_1 === 'string' ? result_1 : result_1[this.options.gender];
            hundreds = unity + " " + hundred;
        }
        var rest = n.substr(1);
        var overflow = Number(rest);
        var result = this.convert(rest);
        var separator = " ";
        var definedSeparator = (_b = this.lang.orderSeparator) !== null && _b !== void 0 ? _b : this.lang.separator;
        var wordsSoFar;
        if (definedSeparator && !this.lang.ignoreHundredsSeparator)
            wordsSoFar = result.replace(new RegExp(definedSeparator, 'i'), "").split(" ");
        else
            wordsSoFar = result.split(" ");
        if (wordsSoFar.length === 1 && !!wordsSoFar[0])
            separator = (_d = (_c = this.lang.orderSeparator) !== null && _c !== void 0 ? _c : this.lang.separator) !== null && _d !== void 0 ? _d : " ";
        if (overflow > 0)
            return (typeof hundreds === 'string' ? hundreds : hundreds[this.options.gender]) + separator + result;
        return (typeof hundreds === 'string' ? hundreds : hundreds[this.options.gender]);
    };
    Wordify.prototype.convert = function (n) {
        var _a, _b;
        var number = Number(n);
        var length = n.length;
        n = number.toString();
        if (!this.firstIteration && n === '0')
            return '';
        this.firstIteration = false;
        var res = '';
        if (res = this.hasInUnits(n))
            return res;
        if (res = this.isLessThan100(n))
            return res;
        if (res = this.isLessThan1000(n))
            return res;
        var sorted = this.lang.other.sort(function (a, b) { return a.exponent - b.exponent; });
        var orderAbove = sorted.findIndex(function (o) { return o.exponent >= length; });
        var order = sorted[orderAbove - 1];
        var multiplier = n.substr(0, n.length - order.exponent);
        var result = '';
        if (order.all) {
            if (typeof order.all === 'string')
                result = order.all;
            else
                result = order.all[this.options.gender];
        }
        else if (Number(multiplier) > 1) {
            if (typeof order.plural === 'string')
                result = order.plural;
            else if (order.plural)
                result = order.plural[this.options.gender];
        }
        else {
            if (typeof order.singular === 'string')
                result = order.singular;
            else if (order.singular)
                result = order.singular[this.options.gender];
        }
        var separator = " ";
        var other = n.substr(multiplier.length);
        var overflow = Number(other);
        if (overflow > 0) {
            var rest = this.convert(other);
            if ((overflow < Math.pow(10, order.exponent) && overflow % Math.pow(10, order.exponent - 1) === 0) || rest.split(" ").length === 1) {
                separator = (_b = (_a = this.lang.orderSeparator) !== null && _a !== void 0 ? _a : this.lang.separator) !== null && _b !== void 0 ? _b : " ";
            }
            return this.convert(multiplier) + " " + result + separator + this.convert(other);
        }
        return "" + this.convert(multiplier) + separator + result;
    };
    Wordify.from = function (number) {
        if (Number.isNaN(number))
            throw new Error('Input is not a number');
        var instance = new Wordify();
        instance.number = number.toString().trim();
        return instance;
    };
    Wordify.prototype.toWords = function (language, options) {
        var _this = this;
        if (language === void 0) { language = Language.EN; }
        if (options)
            this.options = options;
        switch (language) {
            case Language.BG:
                this.lang = bg_1.Bulgarian;
                break;
            case Language.EN:
                this.lang = en_1.English;
                break;
            case Language.PT:
                this.lang = pt_1.Portuguese;
                break;
            case Language.ESLarga:
                this.lang = es_larga_1.SpanishLarga;
                break;
            case Language.ESCorto:
                this.lang = es_corto_1.SpanishCorto;
                break;
            case Language.ES:
                this.lang = es_corto_1.SpanishCorto;
                break;
            default:
                this.lang = en_1.English;
                break;
        }
        var value = this.convert(this.number);
        if (this.lang.exceptions && this.lang.exceptions.length > 0) {
            this.lang.exceptions
                .filter(function (e) { return e.type === 'post'; })
                .forEach(function (e) {
                value = e.func(value, Number(_this.number));
            });
        }
        return value;
    };
    return Wordify;
}());
exports.Wordify = Wordify;
console.log(Wordify.from(60101).toWords(Language.ESCorto));
//# sourceMappingURL=index.js.map