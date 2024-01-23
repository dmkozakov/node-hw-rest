import { ctrlWrapper } from '../../helpers/index';

import listContacts from './listContacts';
import getContactById from './getContactById';
import addContact from './addContact';
import updateContact from './updateContact';
import updateStatusContact from './updateStatusContact';
import removeContact from './removeContact';

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
