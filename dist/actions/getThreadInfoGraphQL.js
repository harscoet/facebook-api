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
const availableFolders = ['inbox', 'pending', 'archived', 'other'];
function getThreadInfoGraphQL(request) {
    return (options = {}) => __awaiter(this, void 0, void 0, function* () {
        /**
         * before is used for pagination, it is first message timestamp from previous page
         * ex: result.messages.nodes[0].timestamp_precise
         */
        const { before, limit = 20, allFolders, folders } = options;
        const selectedFolders = allFolders ? availableFolders : jsutil_1.arrify(folders);
        const form = {
            batch_name: 'MessengerGraphQLThreadlistFetcherRe',
            queries: JSON.stringify({
                o0: {
                    doc_id: '1349387578499440',
                    query_params: {
                        limit: limit + (before ? 1 : 0),
                        before: before ? parseInt(String(before), 10) : null,
                        tags: selectedFolders,
                        includeDeliveryReceipts: true,
                        includeSeqID: true,
                    },
                },
            }),
        };
        const result = yield request.post('api/graphqlbatch', {
            graphql: true,
            withContext: true,
            form,
        });
        const message = result[0].o0.data;
        console.log(message);
        // With before option, facebook returns dupplicate message
        if (before && message && message.messages && message.messages.nodes.length) {
            message.messages.nodes.pop();
        }
        return null;
    });
}
exports.getThreadInfoGraphQL = getThreadInfoGraphQL;
