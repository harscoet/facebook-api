"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../lib/util");
function searchPeople(request) {
    return ({ search, limit } = {}) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const people = [];
        if (!search) {
            return people;
        }
        const res = yield request.get(`search/people/?q=${search}`, {
            withContext: false,
            parseResponse: false,
            payload: false,
        });
        const $doc = util_1.findFromCodeTags(res, '#BrowseResultsContainer');
        if ($doc) {
            $doc.querySelectorAll(':scope > div > div').forEach($node => {
                people.push({
                    id: JSON.parse($node.getAttribute('data-bt')).id,
                    name: $node.querySelector('._32mo span').innerHTML,
                });
            });
        }
        return limit ? people.slice(0, limit) : people;
    });
}
exports.searchPeople = searchPeople;
