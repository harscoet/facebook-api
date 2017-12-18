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
class AsyncLib {
    constructor(options = {}) {
        this._ready = false;
        this._busy = false;
        this._options = options;
    }
    static sleep(delay = 1) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    get delay() {
        return this._options.asyncWaitDelay;
    }
    set delay(delay) {
        this._options.asyncWaitDelay = delay;
    }
    initAsyncDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const deps = [];
            for (const property in this) {
                if (this.hasOwnProperty(property)) {
                    if (this[property] instanceof AsyncLib) {
                        deps.push(this[property].init());
                    }
                }
            }
            if (deps.length) {
                yield Promise.all(deps);
            }
            return this;
        });
    }
    init(noDeep) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._ready) {
                return this;
            }
            if (this._busy) {
                return this.waitReady();
            }
            this._busy = true;
            if (!noDeep) {
                yield this.initAsyncDependencies();
            }
            yield this._init();
            this._busy = false;
            this._ready = true;
            return this;
        });
    }
    initWithoutDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.init(true);
        });
    }
    waitReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._ready) {
                return this;
            }
            yield AsyncLib.sleep(this.delay);
            return this.waitReady();
        });
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this;
        });
    }
}
exports.AsyncLib = AsyncLib;
