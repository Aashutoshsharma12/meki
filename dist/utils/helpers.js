"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.numberFormatter = exports.randomString = exports.getEpochAfterNMinutes = exports.identityGenerator = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function identityGenerator(count, padding) {
    var c = count + 1;
    var str = "" + c;
    var pad = "0000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    var m = new Date();
    var mm = m.getMonth() + 1;
    var yy = m.getFullYear();
    var dd = m.getDate();
    var theID = (padding + "" + yy + "" + mm + "" + dd + "" + ans);
    return theID;
}
exports.identityGenerator = identityGenerator;
function getEpochAfterNMinutes(n) {
    if (n == 0) {
        return Math.round(moment_timezone_1.default.utc().valueOf() / 1000);
    }
    else {
        const time = moment_timezone_1.default.utc().add(n, 'minutes');
        return Math.round(time / 1000);
    }
}
exports.getEpochAfterNMinutes = getEpochAfterNMinutes;
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1)
        mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1)
        mask += '0123456789';
    if (chars.indexOf('~') > -1)
        mask += '~!@*&$';
    var result = '';
    for (var i = length; i > 0; --i)
        result += mask[Math.floor(Math.random() * mask.length)];
    return result.toString();
}
exports.randomString = randomString;
function numberFormatter(num, digits = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    if (num > 1)
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    else
        return num.toFixed(digits);
}
exports.numberFormatter = numberFormatter;
function f() {
    console.log('eneter');
}
exports.f = f;
