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
            const url = 'https://edge-chat.messenger.com/pull';
            const { msgr_region } = yield request.getMessengerContext();
            const commonQueryString = {
                channel: `p_${request.context.__user}`,
                partition: -2,
                clientid: jsutil_1.generateId(8),
                isq: jsutil_1.rand(10000, 99999),
                idle: 1,
                qp: 'y',
                cap: 8,
                pws: 'fresh',
                msgs_recv: 0,
                uid: request.context.__user,
                viewer_uid: request.context.__user,
                state: 'active',
            };
            const batchContext = yield request.get(url, {
                parseResponse: true,
                qs: Object.assign({}, commonQueryString, { cb: jsutil_1.generateId(4), seq: 0, request_batch: 1, msgr_region }),
            });
            const lbInfo = batchContext.batches[0].lb_info;
            const res = yield request.get(url, {
                parseResponse: true,
                qs: Object.assign({}, commonQueryString, { cb: jsutil_1.generateId(4), seq: 1, sticky_token: lbInfo.sticky, sticky_pool: lbInfo.pool }),
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
