"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const contacts_1 = __importDefault(require("./routes/api/contacts"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use('/api/contacts', contacts_1.default);
app.use('/api/users', auth_1.default);
app.use((_, res) => {
    return res.status(404).json({ code: 404, message: 'Not found' });
});
app.use((err, _, res, __S) => {
    const { status = 500, message = 'Server error' } = err;
    return res.status(status).json({ code: status, message });
});
exports.default = app;
//# sourceMappingURL=app.js.map