import express from 'express';
import ctrl from '../../controllers/contacts';
import { validateBody, isValidId, auth, validateQuery } from '../../middlewares';
import schemas from '../../schemas/contacts';

import type { Router } from 'express';

const router: Router = express.Router();
const jsonParser = express.json();

router.get('/', auth, validateQuery(schemas.listContactsQuery), ctrl.listContacts);

router.get('/:id', auth, isValidId, ctrl.getContactById);

router.post('/', auth, jsonParser, validateBody(schemas.addContact), ctrl.addContact);

router.put('/:id', auth, jsonParser, isValidId, validateBody(schemas.addContact), ctrl.updateContact);

router.patch(
  '/:id/favorite',
  auth,
  jsonParser,
  isValidId,
  validateBody(schemas.updateFavoriteContact),
  ctrl.updateStatusContact,
);

router.delete('/:id', auth, isValidId, ctrl.removeContact);

export default router;
