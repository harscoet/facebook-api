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
function getThreadListInfoGraphQL(request) {
    return (options = {}) => __awaiter(this, void 0, void 0, function* () {
        /**
         * before is used for pagination, it is first message timestamp from previous page
         * ex: result.messages.nodes[0].timestamp_precise
         */
        const { before, limit = 20, tags } = options;
        const data = {
            batch_name: 'MessengerGraphQLThreadlistFetcherRe',
            queries: JSON.stringify({
                o0: {
                    doc_id: '1349387578499440',
                    query_params: {
                        limit: limit + (before ? 1 : 0),
                        before: before ? parseInt(String(before), 10) : null,
                        tags: jsutil_1.arrify(tags),
                        includeDeliveryReceipts: true,
                        includeSeqID: false,
                    },
                },
            }),
        };
        const result = yield request.post('api/graphqlbatch', {
            graphql: true,
            withContext: true,
            data,
        });
        const threads = result[0].o0.data.viewer.message_threads;
        // With before option, facebook returns dupplicate message
        if (before && threads && threads.nodes.length) {
            threads.nodes.shift();
        }
        return {
            threads: threads.nodes.map(t => (Object.assign({}, t, { thread_id: t.thread_key.thread_fbid || t.thread_key.other_user_id }))),
        };
    });
}
exports.getThreadListInfoGraphQL = getThreadListInfoGraphQL;
var GetThreadListInfoGraphQL;
(function (GetThreadListInfoGraphQL) {
    let Response;
    (function (Response) {
        let Thread;
        (function (Thread) {
            let Kind;
            (function (Kind) {
                Kind["ONE_TO_ONE"] = "ONE_TO_ONE";
                Kind["GROUP"] = "GROUP";
            })(Kind = Thread.Kind || (Thread.Kind = {}));
        })(Thread = Response.Thread || (Response.Thread = {}));
    })(Response = GetThreadListInfoGraphQL.Response || (GetThreadListInfoGraphQL.Response = {}));
})(GetThreadListInfoGraphQL = exports.GetThreadListInfoGraphQL || (exports.GetThreadListInfoGraphQL = {}));
