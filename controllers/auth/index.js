const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getCurrent = require("./getCurrent");

const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const resendVerify = require("./resendVerify");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const verify = require("./verify");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
