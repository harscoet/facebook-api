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
const axios_1 = require("axios");
const AsyncLib_1 = require("./AsyncLib");
class FacebookRequest extends AsyncLib_1.AsyncLib {
    constructor(options = {}) {
        super(options);
        this.tokenSource = axios_1.default.CancelToken.source();
    }
    static request(options, transform, optionsForKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDev = FacebookRequest.isDev;
            let sessionStorageKey;
            if (isDev) {
                sessionStorageKey = 'fbapi_' + JSON.stringify(optionsForKey || options);
                const responseFromSessionStorage = sessionStorage.getItem(sessionStorageKey);
                if (responseFromSessionStorage) {
                    return JSON.parse(responseFromSessionStorage);
                }
            }
            const rawResponse = (yield axios_1.default(options)).data;
            const response = transform ? transform(rawResponse) : rawResponse;
            if (isDev) {
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(response));
            }
            return response;
        });
    }
    static stringifyQuery(obj, prefix) {
        const pairs = [];
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            const value = obj[key];
            const enkey = encodeURIComponent(key);
            let pair;
            if (typeof value === 'object') {
                pair = FacebookRequest.stringifyQuery(value, prefix ? `${prefix}[${enkey}]` : enkey);
            }
            else {
                pair =
                    (prefix ? `${prefix}[${enkey}]` : enkey) +
                        '=' +
                        encodeURIComponent(value);
            }
            pairs.push(pair);
        }
        return pairs.join('&');
    }
    static getDomainValue(domain) {
        if (!domain) {
            return FacebookRequest.domains[0];
        }
        const value = FacebookRequest.domains[domain];
        if (!value) {
            throw new Error(`Invalid domain, possible values: ${FacebookRequest.domains.join()}`);
        }
        return value;
    }
    static generateContextLogging(fbDtsg) {
        let logging = '2';
        for (let i = 0; i < fbDtsg.length; i++) {
            logging += fbDtsg.charCodeAt(i);
        }
        return logging;
    }
    static parseResponse(response) {
        const length = response.length;
        return JSON.parse(response.substring(9, length));
    }
    static getCurrentContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return FacebookRequest.request({
                method: 'get',
                url: FacebookRequest.getDomainValue(FacebookRequest.Domain.default),
            }, html => {
                const fbDtsg = jsutil_1.getFrom(html, 'name="fb_dtsg" value="', '"');
                const revision = jsutil_1.getFrom(html, 'revision":', ',');
                const userId = jsutil_1.getFrom(html, '"USER_ID":"', '"');
                return {
                    __user: userId,
                    __req: 0,
                    __rev: parseInt(revision, 10),
                    __a: 1,
                    fb_dtsg: fbDtsg,
                    logging: FacebookRequest.generateContextLogging(fbDtsg),
                };
            });
        });
    }
    static getCurrentMessengerContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return FacebookRequest.request({
                method: 'get',
                baseURL: FacebookRequest.getDomainValue(FacebookRequest.Domain.default),
                url: '/messages',
            }, data => ({
                msgr_region: jsutil_1.getFrom(data, '"msgr_region":"', '"'),
            }));
        });
    }
    static get isDev() {
        return localStorage.getItem('facebook_api_is_dev') !== null;
    }
    get(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ url, method: 'get' }, options));
        });
    }
    post(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ url, method: 'post' }, options));
        });
    }
    getContext() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return this.context;
        });
    }
    getMessengerContext() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return this.messengerContext;
        });
    }
    cancel(message) {
        return this.tokenSource.cancel(message);
    }
    request(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            const { url, domain, data, qs, withContext, parseResponse, payload, method, } = options;
            if (withContext && this.context) {
                this.context.__req++;
            }
            const baseRequestOptions = {
                baseURL: FacebookRequest.getDomainValue(domain),
                url,
                method: this._options.forceGet && options.worksWithGetMethod
                    ? 'get'
                    : options.method,
                params: method === 'get' && withContext ? Object.assign({}, this.context, qs) : qs,
            };
            const requestOptions = Object.assign({}, options, baseRequestOptions, { headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }, cancelToken: this.tokenSource.token, data: new URLSearchParams(FacebookRequest.stringifyQuery(Object.assign({}, (withContext ? this.context : {}), data))) });
            if (options.graphql) {
                requestOptions.responseType = 'text';
            }
            return FacebookRequest.request(requestOptions, rawResponse => {
                let parsedResponse;
                if (options.graphql) {
                    parsedResponse = rawResponse.split('\r\n').map(JSON.parse);
                }
                else {
                    parsedResponse = parseResponse
                        ? FacebookRequest.parseResponse(rawResponse)
                        : rawResponse;
                }
                return payload ? parsedResponse.payload : parsedResponse;
            }, Object.assign({}, baseRequestOptions, { data: withContext
                    ? Object.assign({ __user: this.context.__user }, data) : data }));
        });
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.context) {
                this.context = yield FacebookRequest.getCurrentContext();
            }
            if (!this.messengerContext) {
                this.messengerContext = yield FacebookRequest.getCurrentMessengerContext();
            }
            return this;
        });
    }
}
FacebookRequest.domains = [
    'https://www.facebook.com',
    'https://m.facebook.com',
    'https://www.messenger.com',
];
exports.FacebookRequest = FacebookRequest;
(function (FacebookRequest) {
    let Domain;
    (function (Domain) {
        Domain[Domain["default"] = 0] = "default";
        Domain[Domain["mobile"] = 1] = "mobile";
        Domain[Domain["messenger"] = 2] = "messenger";
    })(Domain = FacebookRequest.Domain || (FacebookRequest.Domain = {}));
})(FacebookRequest = exports.FacebookRequest || (exports.FacebookRequest = {}));
