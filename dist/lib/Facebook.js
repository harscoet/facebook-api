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
const actions = require("../actions");
const types = require("../types");
const lib = require(".");
const AsyncLib_1 = require("../lib/AsyncLib");
const FacebookRequest_1 = require("../lib/FacebookRequest");
class Facebook extends AsyncLib_1.AsyncLib {
    constructor(options = {}, request) {
        super(options);
        this.types = types;
        this.lib = lib;
        this.actions = actions;
        this._request = request ? request : new FacebookRequest_1.FacebookRequest(options);
    }
    getContext() {
        return this._request.getContext();
    }
    getUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getContext()).common.__user;
        });
    }
}
exports.Facebook = Facebook;
for (const i in actions) {
    if (actions.hasOwnProperty(i)) {
        Facebook.prototype[i] = function () {
            return actions[i](this._request).apply(this, arguments);
        };
    }
}
