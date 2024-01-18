"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const contactsPath = path_1.default.join(__dirname, 'contacts.json');
const listContacts = async () => {
    const contacts = await promises_1.default.readFile(contactsPath);
    return JSON.parse(contacts.toString());
};
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const oneContact = contacts.find((contact) => contact.id === contactId);
    return oneContact || null;
};
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await promises_1.default.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};
const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = {
        id: (0, nanoid_1.nanoid)(),
        ...body,
    };
    contacts.push(newContact);
    await promises_1.default.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};
const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id: contactId, ...body };
    await promises_1.default.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
};
exports.default = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
//# sourceMappingURL=contacts.js.map