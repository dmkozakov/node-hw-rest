import type { Router } from 'express';
import { ctrls } from '../../controllers/contacts';

import express from 'express';
import { validateBody } from '../../middlewares';
import { addSchema } from '../../schemas';

const router: Router = express.Router();

router.get('/', ctrls.listContacts);

router.get('/:contactId', ctrls.getContactById);

router.post('/', validateBody(addSchema), ctrls.addContact);

router.put('/:contactId', ctrls.updateContact);

router.delete('/:contactId', ctrls.removeContact);

export default router;
