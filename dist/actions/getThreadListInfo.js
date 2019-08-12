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
const availableFolders = [
    'INBOX',
    'PENDING',
    'ARCHIVED',
    'OTHER',
];
const availableClients = [
    'mercury',
    'jewel',
    'web_messenger',
];
/**
 * NO LONGER WORKING!
 */
function getThreadListInfo(request) {
    return (options = {}) => __awaiter(this, void 0, void 0, function* () {
        const { client = 'mercury', limit = 10, page, offset: rawOffset, folders = ['inbox'], allFolders, } = options;
        const selectedFolders = allFolders ? availableFolders : jsutil_1.arrify(folders);
        const offset = jsutil_1.getOffset(limit, page, rawOffset);
        const form = { client };
        jsutil_1.checkArrayParam(client, availableClients, 'client');
        for (const folder of selectedFolders) {
            jsutil_1.checkArrayParam(folder, availableFolders, 'folder');
            form[folder] = {
                limit,
                offset,
            };
        }
        const result = yield request.post('ajax/mercury/threadlist_info.php', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: true,
            form,
        });
        if (!result) {
            return {
                threads: [],
                ordered_threadlists: [],
                participants: [],
                unseen_thread_fbids: [],
                roger: {},
                delivery_receipts: [],
                payload_source: '',
            };
        }
        if (!result.threads) {
            result.threads = [];
        }
        return result;
    });
}
exports.getThreadListInfo = getThreadListInfo;
