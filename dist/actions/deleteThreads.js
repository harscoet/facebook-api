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
function deleteThreads(request) {
    return (ids) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        return request.post('ajax/mercury/delete_thread.phpd', {
            withContext: true,
            parseResponse: true,
            payload: true,
            qs: {
                dpr: 2,
            },
            data: {
                ids: jsutil_1.arrify(ids),
            },
        });
    });
}
exports.deleteThreads = deleteThreads;
