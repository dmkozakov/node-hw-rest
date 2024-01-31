import ctrlWrapper from '../../helpers/ctrlWrapper';
import getCurrent from './getCurrent';

import login from './login';
import logout from './logout';
import register from './register';
import updateAvatar from './updateAvatar';
import updateSubscription from './updateSubscription';
import refresh from './refresh';

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  refresh: ctrlWrapper(refresh),
};
