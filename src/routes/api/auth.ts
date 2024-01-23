import express from 'express';
import authCtrl from '../../controllers/auth';
import { validateBody, auth, isValidId, upload } from '../../middlewares';
import schemas from '../../schemas/users';

import type { Router } from 'express';

const router: Router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(schemas.register), authCtrl.register);

router.post('/login', jsonParser, validateBody(schemas.login), authCtrl.login);

router.get('/current', auth, authCtrl.getCurrent);

router.post('/logout', auth, authCtrl.logout);

router.patch('/avatars', auth, upload.single('avatar'), authCtrl.updateAvatar);

router.patch(
  '/:id/subscription',
  auth,
  isValidId,
  jsonParser,
  validateBody(schemas.updateSubscription),
  authCtrl.updateSubscription,
);

export default router;
