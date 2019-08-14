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
function addPagination(target, key, arr, limit, offset, timestamp) {
    for (const id of jsutil_1.arrify(arr)) {
        if (!target[key]) {
            target[key] = {};
        }
        target[key][id] = {
            limit,
            offset,
            timestamp,
        };
    }
}
function getThreadInfo(request) {
    return (options = {}) => __awaiter(this, void 0, void 0, function* () {
        const { client, limit = 10, offset: rawOffset, page, threadFbids, threadIds, userIds, timestamp, } = options;
        const offset = jsutil_1.getOffset(limit, page, rawOffset);
        if (offset && !timestamp) {
            throw new Error('timestamp option is required when offset > 0');
        }
        const data = {
            client,
            messages: {},
        };
        addPagination(data.messages, 'thread_ids', threadIds, limit, offset, timestamp);
        addPagination(data.messages, 'thread_fbids', threadFbids, limit, offset, timestamp);
        addPagination(data.messages, 'user_ids', userIds, limit, offset, timestamp);
        return request.post('ajax/mercury/thread_info.php', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: true,
            data,
        });
    });
}
exports.getThreadInfo = getThreadInfo;
