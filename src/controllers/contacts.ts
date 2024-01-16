import contacts from '../models/contacts.ts';
import { HttpError, ctrlWrapper } from './../helpers';
import type { Request, Response } from 'express';

const listContacts = async (req: Request, res: Response) => {
  const result = await contacts.listContacts();
  return res.json(result);
};

const getContactById = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError.setHttpError(404, 'Not Found');
  }

  return res.json(result);
};

const addContact = async (req: Request, res: Response) => {
  const result = await contacts.addContact(req.body);

  return res.status(201).json(result);
};

const removeContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError.setHttpError(404, 'Not Found');
  }

  return res.json(result);
};

const updateContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError.setHttpError(404, 'Not Found');
  }

  return res.json(result);
};

export const ctrls = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
