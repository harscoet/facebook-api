"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
function getFrom(str, startToken, endToken) {
    const startTokenLength = startToken.length;
    const start = str.indexOf(startToken) + startTokenLength;
    if (start < startTokenLength) {
        return '';
    }
    const lastHalf = str.substring(start);
    const end = lastHalf.indexOf(endToken);
    if (end === -1) {
        throw Error(`Could not find endTime ${endToken} in the given string.`);
    }
    return lastHalf.substring(0, end);
}
exports.getFrom = getFrom;
function isNil(val) {
    return val === null || val === undefined;
}
exports.isNil = isNil;
function arrify(arr) {
    if (isNil(arr)) {
        return [];
    }
    if (Array.isArray(arr)) {
        return arr;
    }
    if (typeof arr === 'object') {
        const values = [];
        for (const i in arr) {
            if (arr.hasOwnProperty(i)) {
                values.push(arr[i]);
            }
        }
        return values;
    }
    return [arr];
}
exports.arrify = arrify;
function checkArrayParam(value, options, name = '') {
    if (options.indexOf(value) === -1) {
        throw new Error(`Invalid ${name} ${value}. Available values: ${options.join()})`);
    }
}
exports.checkArrayParam = checkArrayParam;
function getOffset(limit = 10, page, offset) {
    if (!isNil(offset) && !isNil(page)) {
        throw new Error('Select between offset and page option, but not both');
    }
    if (!isNil(offset)) {
        return offset;
    }
    return page && page > 1 ? limit * (page - 1) : 0;
}
exports.getOffset = getOffset;
function isFemale(user) {
    return user.gender === types_1.Gender.female_plural || user.gender === types_1.Gender.female_singular || user.gender === types_1.Gender.female_singular_guess;
}
exports.isFemale = isFemale;
function isMale(user) {
    return user.gender === types_1.Gender.male_plural || user.gender === types_1.Gender.male_singular || user.gender === types_1.Gender.male_singular_guess;
}
exports.isMale = isMale;
function removeQueryUrl(val) {
    return val.substring(0, val.indexOf('?'));
}
exports.removeQueryUrl = removeQueryUrl;
function paginateArray(arr, limit, page) {
    const offset = getOffset(limit, page);
    return arr.slice(offset, offset + limit);
}
exports.paginateArray = paginateArray;
function getPageNumber(total, limit) {
    return Math.floor(total / limit);
}
exports.getPageNumber = getPageNumber;
function padZeros(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = '0' + val;
    }
    return val;
}
exports.padZeros = padZeros;
function binaryToDecimal(data) {
    let ret = '';
    while (data !== '0') {
        let end = 0;
        let fullName = '';
        let i = 0;
        for (; i < data.length; i++) {
            end = 2 * end + parseInt(data[i], 10);
            if (end >= 10) {
                fullName += '1';
                end -= 10;
            }
            else {
                fullName += '0';
            }
        }
        ret = end.toString() + ret;
        data = fullName.slice(fullName.indexOf('1'));
    }
    return ret;
}
exports.binaryToDecimal = binaryToDecimal;
function generateOfflineThreadingID() {
    const ret = Date.now();
    const value = Math.floor(Math.random() * 4294967295);
    const str = ('0000000000000000000000' + value.toString(2)).slice(-22);
    const msgs = ret.toString(2) + str;
    return binaryToDecimal(msgs);
}
exports.generateOfflineThreadingID = generateOfflineThreadingID;
