"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_1 = require("../../controllers/contacts");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../schemas");
const router = express_1.default.Router();
router.get('/', contacts_1.ctrls.listContacts);
router.get('/:contactId', contacts_1.ctrls.getContactById);
router.post('/', (0, middlewares_1.validateBody)(schemas_1.addSchema), contacts_1.ctrls.addContact);
router.put('/:contactId', contacts_1.ctrls.updateContact);
router.delete('/:contactId', contacts_1.ctrls.removeContact);
exports.default = router;
//# sourceMappingURL=contacts.js.map