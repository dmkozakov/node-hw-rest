"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = __importDefault(require("../../controllers/contacts"));
const middlewares_1 = require("../../middlewares");
const contacts_2 = __importDefault(require("../../schemas/contacts"));
const router = express_1.default.Router();
const jsonParser = express_1.default.json();
router.get('/', middlewares_1.auth, (0, middlewares_1.validateQuery)(contacts_2.default.listContactsQuery), contacts_1.default.listContacts);
router.get('/:id', middlewares_1.auth, middlewares_1.isValidId, contacts_1.default.getContactById);
router.post('/', middlewares_1.auth, jsonParser, (0, middlewares_1.validateBody)(contacts_2.default.addContact), contacts_1.default.addContact);
router.put('/:id', middlewares_1.auth, jsonParser, middlewares_1.isValidId, (0, middlewares_1.validateBody)(contacts_2.default.addContact), contacts_1.default.updateContact);
router.patch('/:id/favorite', middlewares_1.auth, jsonParser, middlewares_1.isValidId, (0, middlewares_1.validateBody)(contacts_2.default.updateFavoriteContact), contacts_1.default.updateStatusContact);
router.delete('/:id', middlewares_1.auth, middlewares_1.isValidId, contacts_1.default.removeContact);
exports.default = router;
//# sourceMappingURL=contacts.js.map