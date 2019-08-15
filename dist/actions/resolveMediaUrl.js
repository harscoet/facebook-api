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
function resolveMediaUrl(request) {
    return (mediaId) => __awaiter(this, void 0, void 0, function* () {
        const result = yield request.post('mercury/attachments/photo', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: false,
            data: {
                photo_id: mediaId,
            },
        });
        return result.jsmods.require[0][3][0];
    });
}
exports.resolveMediaUrl = resolveMediaUrl;
