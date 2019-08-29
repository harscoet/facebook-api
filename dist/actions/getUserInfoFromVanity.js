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
const jsutil_1 = require("jsutil");
const FacebookRequest_1 = require("../lib/FacebookRequest");
function getUserInfoFromVanity(request) {
    return (vanity) => __awaiter(this, void 0, void 0, function* () {
        const rawResponse = yield request.get(vanity, {
            withContext: false,
            parseResponse: false,
            payload: false,
            domain: FacebookRequest_1.FacebookRequest.Domain.mobile,
        });
        return {
            id: jsutil_1.getFrom(rawResponse, 'profile_id&quot;:', ','),
            name: jsutil_1.getFrom(rawResponse, '<title>', '</title>'),
        };
    });
}
exports.getUserInfoFromVanity = getUserInfoFromVanity;
