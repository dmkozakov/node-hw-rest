"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const contacts_1 = __importDefault(require("./routes/api/contacts"));
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/contacts', contacts_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, _next) => {
    const { status = 500, message = 'Server error' } = err;
    return res.status(status).json({ message });
});
exports.default = app;
//# sourceMappingURL=app.js.map