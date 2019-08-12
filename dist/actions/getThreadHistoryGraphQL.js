'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
function getThreadHistoryGraphQL(request) {
  return (options = {}) =>
    __awaiter(this, void 0, void 0, function*() {
      /**
       * before is used for pagination, it is first message timestamp from previous page
       * ex: result.messages.nodes[0].timestamp_precise
       */
      const { before, limit = 20, threadId } = options;
      const form = {
        queries: JSON.stringify({
          o0: {
            doc_id: '1758598864152627',
            query_params: {
              id: threadId,
              message_limit: limit + (before ? 1 : 0),
              load_messages: 1,
              load_read_receipts: false,
              before: before ? parseInt(String(before), 10) : null,
            },
          },
        }),
      };
      const result = yield request.post('api/graphqlbatch', {
        graphql: true,
        withContext: true,
        form,
      });
      const message = result[0].o0.data.message_thread;
      // With before option, facebook returns dupplicate message
      if (
        before &&
        message &&
        message.messages &&
        message.messages.nodes.length
      ) {
        message.messages.nodes.pop();
      }
      return message;
    });
}
exports.getThreadHistoryGraphQL = getThreadHistoryGraphQL;
