import express, { Router } from 'express';
import authCtrl from '../../controllers/auth';
import { validateBody, auth, isValidId, upload } from '../../middlewares';
import schemas from '../../schemas/users';
import emailCtrl from '../../controllers/email';

const router: Router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(schemas.register), authCtrl.register);

router.get('/verify/:token', emailCtrl.verify);

router.post('/verify', jsonParser, emailCtrl.resendVerify);

router.post('/login', jsonParser, validateBody(schemas.login), authCtrl.login);

router.get('/refresh', authCtrl.refresh);

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
