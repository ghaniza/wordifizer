"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wordify = exports.Language = void 0;
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
var en_1 = require("./i18n/en");
var bg_1 = require("./i18n/bg");
var pt_1 = require("./i18n/pt");
var constants_1 = require("./constants");
var Language;
(function (Language) {
    Language["EN"] = "en";
    Language["BG"] = "bg";
    Language["PT"] = "pt";
})(Language = exports.Language || (exports.Language = {}));
var Wordify = (function () {
    function Wordify() {
        this.number = "";
        this.firstIteration = true;
        this.lang = en_1.English;
        this.options = constants_1.DEFAULT_OPTIONS;
    }
    Wordify.prototype.isEverythingOk = function () {
        if (!this.lang)
            throw new Error('Invalid language');
        if (!this.options)
            throw new Error('Invalid options');
    };
    Wordify.prototype.isLessThan20 = function (n) {
        if (Number(n) >= 20)
            return "";
        var response = this.lang.units[n];
        if (!response)
            throw new Error(constants_1.ERROR.MISSING_PROPERTY);
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
        var tens = this.lang.tens[n[0].padEnd(2, '0')];
        if (!tens)
            throw new Error(constants_1.ERROR.MISSING_PROPERTY);
        var rest = this.convert(n.substr(1));
        if (!rest) {
            if (typeof tens === 'string')
                return tens;
            if (this.options.gender && tens[this.options.gender])
                return tens[this.options.gender];
            else
                throw new Error(constants_1.ERROR.MISSING_GENDER);
            throw new Error(constants_1.ERROR.INVALID_GENDER);
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
        if (res = this.isLessThan20(n))
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
            var final_1 = this.convert(multiplier) + " " + result + separator + this.convert(other);
            return final_1;
        }
        var final = "" + this.convert(multiplier) + separator + result;
        return final;
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
function generate() {
    var max = 1000000;
    var count = 5000;
    var language = Language.BG;
    var data = '';
    for (var i = 0; i < count; i++) {
        var n = crypto_1.default.randomBytes(4).readUInt32LE() / 0x100000000;
        var v = Math.ceil(n * max);
        var line = v + ": " + Wordify.from(v).toWords(language);
        data += line + '\n';
    }
    fs_1.default.writeFileSync('./' + language + '.txt', data);
}
generate();
//# sourceMappingURL=index.js.map