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
function getSharedMedia(request) {
  return ({ after, first = 100, id }) =>
    __awaiter(this, void 0, void 0, function*() {
      const result = yield request.post('webgraphql/query/', {
        parseResponse: true,
        payload: true,
        withContext: true,
        qs: {
          query_id: '515216185516880',
          variables: JSON.stringify({
            id,
            after,
            first,
          }),
          dpr: 1,
        },
      });
      return result && result[id] && result[id].message_shared_media
        ? result[id].message_shared_media
        : {
            count: 0,
            edges: [],
            page_info: {
              has_next_page: false,
              has_previous_page: false,
              end_cursor: null,
              start_cursor: null,
            },
          };
    });
}
exports.getSharedMedia = getSharedMedia;
var GetSharedMedia;
(function(GetSharedMedia) {
  let Response;
  (function(Response) {
    let Node;
    (function(Node) {
      let Kind;
      (function(Kind) {
        Kind['MessageImage'] = 'MessageImage';
        Kind['MessageVideo'] = 'MessageVideo';
        Kind['MessageFile'] = 'MessageFile';
        Kind['MessageAudio'] = 'MessageAudio';
      })((Kind = Node.Kind || (Node.Kind = {})));
    })((Node = Response.Node || (Response.Node = {})));
  })((Response = GetSharedMedia.Response || (GetSharedMedia.Response = {})));
})((GetSharedMedia = exports.GetSharedMedia || (exports.GetSharedMedia = {})));
