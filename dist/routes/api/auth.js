"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../controllers/auth"));
const middlewares_1 = require("../../middlewares");
const users_1 = __importDefault(require("../../schemas/users"));
const email_1 = __importDefault(require("../../controllers/email"));
const router = express_1.default.Router();
const jsonParser = express_1.default.json();
router.post('/register', jsonParser, (0, middlewares_1.validateBody)(users_1.default.register), auth_1.default.register);
router.get('/verify/:token', email_1.default.verify);
router.post('/verify', jsonParser, email_1.default.resendVerify);
router.post('/login', jsonParser, (0, middlewares_1.validateBody)(users_1.default.login), auth_1.default.login);
router.get('/refresh', auth_1.default.refresh);
router.get('/current', middlewares_1.auth, auth_1.default.getCurrent);
router.post('/logout', middlewares_1.auth, auth_1.default.logout);
router.patch('/avatars', middlewares_1.auth, middlewares_1.upload.single('avatar'), auth_1.default.updateAvatar);
router.patch('/:id/subscription', middlewares_1.auth, middlewares_1.isValidId, jsonParser, (0, middlewares_1.validateBody)(users_1.default.updateSubscription), auth_1.default.updateSubscription);
exports.default = router;
//# sourceMappingURL=auth.js.map