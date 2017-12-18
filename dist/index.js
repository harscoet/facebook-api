"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Facebook_1 = require("./lib/Facebook");
__export(require("./actions"));
__export(require("./types"));
__export(require("./lib"));
exports.default = new Facebook_1.Facebook();
