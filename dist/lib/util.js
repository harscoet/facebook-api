"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsutil_1 = require("jsutil");
const types_1 = require("../types");
function isFemale(user) {
    return user.gender === types_1.Gender.female_plural || user.gender === types_1.Gender.female_singular || user.gender === types_1.Gender.female_singular_guess;
}
exports.isFemale = isFemale;
function isMale(user) {
    return user.gender === types_1.Gender.male_plural || user.gender === types_1.Gender.male_singular || user.gender === types_1.Gender.male_singular_guess;
}
exports.isMale = isMale;
function generateOfflineThreadingID() {
    const ret = Date.now();
    const value = Math.floor(Math.random() * 4294967295);
    const str = ('0000000000000000000000' + value.toString(2)).slice(-22);
    const msgs = ret.toString(2) + str;
    return jsutil_1.binaryToDecimal(msgs);
}
exports.generateOfflineThreadingID = generateOfflineThreadingID;
function parseHtmlFromString(value) {
    return new DOMParser().parseFromString(value, 'text/html');
}
exports.parseHtmlFromString = parseHtmlFromString;
function parseCommentedHtmlFromString(value) {
    return parseHtmlFromString(value.slice(5, -4));
}
exports.parseCommentedHtmlFromString = parseCommentedHtmlFromString;
function findFromCodeTags(htmlStringOrHtmlDom, selector) {
    let html;
    if (typeof htmlStringOrHtmlDom === 'string') {
        html = parseHtmlFromString(htmlStringOrHtmlDom);
    }
    const $codes = html.querySelectorAll('code');
    let $container;
    $codes.forEach($code => {
        const $candidateContainer = parseCommentedHtmlFromString($code.innerHTML)
            .querySelector(selector);
        if ($candidateContainer) {
            $container = $candidateContainer;
            return;
        }
    });
    return $container;
}
exports.findFromCodeTags = findFromCodeTags;
