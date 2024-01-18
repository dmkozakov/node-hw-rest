"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrls = void 0;
const contacts_ts_1 = __importDefault(require("../models/contacts.ts"));
const helpers_1 = require("./../helpers");
const listContacts = async (req, res) => {
    const result = await contacts_ts_1.default.listContacts();
    return res.json(result);
};
const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts_ts_1.default.getContactById(contactId);
    if (!result) {
        throw helpers_1.HttpError.setHttpError(404, 'Not Found');
    }
    return res.json(result);
};
const addContact = async (req, res) => {
    const result = await contacts_ts_1.default.addContact(req.body);
    return res.status(201).json(result);
};
const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts_ts_1.default.removeContact(contactId);
    if (!result) {
        throw helpers_1.HttpError.setHttpError(404, 'Not Found');
    }
    return res.json(result);
};
const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts_ts_1.default.updateContact(contactId, req.body);
    if (!result) {
        throw helpers_1.HttpError.setHttpError(404, 'Not Found');
    }
    return res.json(result);
};
exports.ctrls = {
    listContacts: (0, helpers_1.ctrlWrapper)(listContacts),
    getContactById: (0, helpers_1.ctrlWrapper)(getContactById),
    addContact: (0, helpers_1.ctrlWrapper)(addContact),
    removeContact: (0, helpers_1.ctrlWrapper)(removeContact),
    updateContact: (0, helpers_1.ctrlWrapper)(updateContact),
};
//# sourceMappingURL=contacts.js.map