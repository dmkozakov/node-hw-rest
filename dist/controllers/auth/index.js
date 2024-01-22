"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlWrapper_1 = require("../../helpers/ctrlWrapper");
const getCurrent_1 = __importDefault(require("./getCurrent"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const register_1 = __importDefault(require("./register"));
const updateSubscription_1 = __importDefault(require("./updateSubscription"));
exports.default = {
    register: (0, ctrlWrapper_1.ctrlWrapper)(register_1.default),
    login: (0, ctrlWrapper_1.ctrlWrapper)(login_1.default),
    getCurrent: (0, ctrlWrapper_1.ctrlWrapper)(getCurrent_1.default),
    logout: (0, ctrlWrapper_1.ctrlWrapper)(logout_1.default),
    updateSubscription: (0, ctrlWrapper_1.ctrlWrapper)(updateSubscription_1.default),
};
//# sourceMappingURL=index.js.map