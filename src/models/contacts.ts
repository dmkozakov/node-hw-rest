import { IContact } from './../interfaces/IContact';
type ContactBody = Omit<IContact, 'id'>;

import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async (): Promise<IContact[]> => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts.toString());
};

const getContactById = async (contactId: string): Promise<IContact | null> => {
  const contacts = await listContacts();
  const oneContact: IContact | undefined = contacts.find((contact: IContact) => contact.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId: string): Promise<IContact | null> => {
  const contacts = await listContacts();
  const index: number = contacts.findIndex((contact: IContact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result]: IContact[] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body: ContactBody) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId: string, body: ContactBody): Promise<IContact | null> => {
  const contacts = await listContacts();
  const index: number = contacts.findIndex((contact: IContact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
