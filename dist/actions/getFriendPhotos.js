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
function parseCommentedHtml(html) {
    return new DOMParser().parseFromString(html.slice(5, -4), 'text/html');
}
function getFriendPhotos(request) {
    return ({ id }) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const html = yield request.get(`${id}/photos_all`, {
            withContext: false,
            parseResponse: false,
            payload: false,
        });
        const context = {
            collection_token: jsutil_1.getFrom(html, 'pagelet_timeline_app_collection_', '"'),
            lst: jsutil_1.getFrom(html, 'lst:"', '"'),
            pagelet_token: jsutil_1.getFrom(html, 'pagelet_token:"', '"'),
        };
        const photos = [];
        const parser = new DOMParser();
        const $document = parser.parseFromString(html, 'text/html');
        const $codes = $document.querySelectorAll('code');
        let $container;
        $codes.forEach($code => {
            const $candidateContainer = parseCommentedHtml($code.innerHTML)
                .querySelector('.fbPhotosRedesignBorderOverlay');
            if ($candidateContainer) {
                $container = $candidateContainer;
                return;
            }
        });
        if ($container) {
            $container.querySelectorAll('li').forEach($node => {
                const style = $node.querySelector('i').getAttribute('style');
                const thumbnail = jsutil_1.getFrom(style, 'background-image: url(', ')');
                photos.push(thumbnail);
            });
        }
        return {
            context,
            photos,
        };
    });
}
exports.getFriendPhotos = getFriendPhotos;
