import { ctrlWrapper } from '../../helpers/ctrlWrapper';
import getCurrent from './getCurrent';

import login from './login';
import logout from './logout';
import register from './register';
import updateSubscription from './updateSubscription';

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
