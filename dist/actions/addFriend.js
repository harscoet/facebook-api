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
function addFriend(request) {
  return id =>
    __awaiter(this, void 0, void 0, function*() {
      yield request.init();
      return request.post('ajax/add_friend/action.php', {
        withContext: true,
        parseResponse: true,
        payload: true,
        qs: {
          dpr: 1,
        },
        data: {
          to_friend: id,
          action: 'add_friend',
          how_found: 'profile_button',
          ref_param: 'none',
          outgoing_id: '',
          logging_location: '',
          no_flyout_on_click: true,
          ego_log_data: '',
          http_referer: 'https://www.facebook.com/',
          floc: 'profile_button',
          frefs: ['none'],
        },
      });
    });
}
exports.addFriend = addFriend;
