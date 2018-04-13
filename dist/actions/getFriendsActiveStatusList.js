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
const util_1 = require("../lib/util");
function getFriendsActiveStatusList(request) {
    return ({ filterId, legacy } = {}) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const friends = {};
        if (legacy) {
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
                    friends[buddy.id] = {
                        is_active: true,
                    };
                }
            }
        }
        else {
            const res = yield request.get(`https://edge-chat.messenger.com/pull`, {
                parseResponse: true,
                qs: {
                    channel: `p_${request.context.__user}`,
                    seq: 1,
                    partition: -2,
                    clientid: util_1.generateId(8),
                    cb: util_1.generateId(4),
                    idle: 1,
                    qp: 'y',
                    cap: 8,
                    pws: 'fresh',
                    isq: 10635,
                    msgs_recv: 0,
                    uid: request.context.__user,
                    viewer_uid: request.context.__user,
                    sticky_token: 512,
                    sticky_pool: 'lla1c26_chat-proxy',
                    state: 'active',
                },
            });
            const buddyList = res.ms[0].buddyList;
            for (const id of Object.keys(buddyList)) {
                friends[id] = {
                    lat: buddyList[id].lat,
                    is_active: buddyList[id].hasOwnProperty('p') && buddyList[id].p > 0,
                };
            }
        }
        return friends;
    });
}
exports.getFriendsActiveStatusList = getFriendsActiveStatusList;
