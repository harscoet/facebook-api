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
function getThreadPicture(request) {
    return (threadId, imageId) => __awaiter(this, void 0, void 0, function* () {
        const result = yield request.post('ajax/messaging/attachments/sharedphotos.php', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: false,
            form: {
                thread_id: threadId,
                image_id: imageId,
            },
        });
        // Ugh...
        const queryThreadID = result.jsmods.require[0][3][1].query_metadata.query_path[0].message_thread;
        const imageData = result.jsmods.require[0][3][1].query_results[queryThreadID].message_images.edges[0].node.image2;
        return imageData;
    });
}
exports.getThreadPicture = getThreadPicture;
