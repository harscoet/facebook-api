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
function getFriendsList(request) {
    return ({ gender } = {}) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const payload = yield request.post('chat/user_info_all', {
            withContext: true,
            parseResponse: true,
            payload: true,
            form: {
                viewer: request.context.__user,
            },
        });
        const users = {};
        for (const userId in payload) {
            if (payload.hasOwnProperty(userId)) {
                const user = payload[userId];
                if (user.is_friend) {
                    if (!gender ||
                        (typeof gender !== 'string' && user.gender === gender) ||
                        (gender === 'male' || gender === 'm') && util_1.isMale(user) ||
                        (gender === 'female' || gender === 'f') && util_1.isFemale(user)) {
                        users[userId] = user;
                    }
                }
            }
        }
        return users;
    });
}
exports.getFriendsList = getFriendsList;
