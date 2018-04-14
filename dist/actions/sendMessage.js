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
function sendMessage(request) {
    return (id, message = '') => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        if (typeof message === 'string') {
            message = {
                body: message,
            };
        }
        const messageId = util_1.generateOfflineThreadingID();
        const form = {
            client: 'mercury',
            action_type: 'ma-type:user-generated-message',
            timestamp: Date.now(),
            is_spoof_warning: false,
            source: 'source:chat:web',
            tags: ['bnp:trigger:messenger_web'],
            body: message.body ? String(message.body) : '',
            offline_threading_id: messageId,
            message_id: messageId,
            other_user_fbid: id,
            ephemeral_ttl_mode: '0',
            has_attachment: !!(message.attachment || message.url || message.sticker),
            specific_to_list: [`fbid:${id}`, `fbid:${request.context.common.__user}`],
        };
        return request.post('messaging/send', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: true,
            qs: {
                dpr: 2,
            },
            form,
        });
    });
}
exports.sendMessage = sendMessage;
