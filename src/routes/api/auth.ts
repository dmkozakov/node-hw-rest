import express, { Router } from 'express';
import ctrl from '../../controllers/auth';
import { validateBody, auth, isValidId } from '../../middlewares';
import schemas from '../../schemas/users';

const router: Router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(schemas.register), ctrl.register);

router.post('/login', jsonParser, validateBody(schemas.login), ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.post('/logout', auth, ctrl.logout);

router.patch(
  '/:id/subscription',
  auth,
  isValidId,
  jsonParser,
  validateBody(schemas.updateSubscription),
  ctrl.updateSubscription,
);

export default router;
