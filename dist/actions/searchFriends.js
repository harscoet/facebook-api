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
function searchFriends(request) {
    return (options = {}) => __awaiter(this, void 0, void 0, function* () {
        yield request.init();
        const res = yield request.post('ajax/growth/friend_browser/checkbox.php', {
            worksWithGetMethod: true,
            withContext: true,
            parseResponse: true,
            payload: true,
            qs: {
                dpr: 2,
            },
            form: {
                how_found: 'requests_page_pymk',
                page: 'friend_browser_list',
                instance_name: 'friend-browser',
                big_pics: 1,
                social_context: 1,
                network_context: 1,
                name_input: options.search,
                used_typeahead: false,
            },
        });
        if (!(res && res.results && res.results.__html)) {
            return [];
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.results.__html, 'text/html');
        const friends = [];
        doc.querySelectorAll('ul > li > div').forEach($node => {
            const $id = $node.querySelector('.friendBrowserID');
            const $name = $node.querySelector('.friendBrowserNameTitle a');
            friends.push({
                id: $id ? $id.getAttribute('value') : null,
                name: $name ? $node.querySelector('.friendBrowserNameTitle a').innerHTML.replace(/<\/?span[^>]*>/g, '') : null,
            });
        });
        return friends;
    });
}
exports.searchFriends = searchFriends;
