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
const FacebookRequest_1 = require("../lib/FacebookRequest");
function getFriendsActiveStatusList(request) {
    return ({ filterId } = {}) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const friends = {};
        const payload = yield request.post('buddylist_update.php', {
            domain: FacebookRequest_1.FacebookRequest.Domain.mobile,
            withContext: true,
            parseResponse: true,
            payload: true,
            form: {
                data_fetch: true,
                __ajax__: 1,
            },
        });
        for (const buddy of payload.buddylist) {
            if (!filterId || filterId === buddy.id) {
                friends[buddy.id] = buddy.status;
            }
        }
        return friends;
    });
}
exports.getFriendsActiveStatusList = getFriendsActiveStatusList;
