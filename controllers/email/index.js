const { verify } = require("../../services/EmailService");
const resendVerify = require("./resendVerify");

module.exports = {
  verify,
  resendVerify,
};
