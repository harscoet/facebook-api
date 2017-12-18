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
function getAttachmentImage(request) {
    return (threadId, imageId) => __awaiter(this, void 0, void 0, function* () {
        const queryId = '535955503408405';
        const result = yield request.post('webgraphql/query/', {
            parseResponse: true,
            payload: true,
            withContext: true,
            qs: {
                query_id: queryId,
                variables: JSON.stringify({
                    id: threadId,
                    photoID: imageId,
                }),
                dpr: 1,
            },
        });
        return result[threadId].message_shared_media.edges[0].node;
    });
}
exports.getAttachmentImage = getAttachmentImage;
