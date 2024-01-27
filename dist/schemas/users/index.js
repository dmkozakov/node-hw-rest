"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const updateSubscription_1 = __importDefault(require("./updateSubscription"));
exports.default = { register: register_1.default, login: login_1.default, updateSubscription: updateSubscription_1.default };
//# sourceMappingURL=index.js.map