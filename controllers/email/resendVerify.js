const { HttpError, verifyEmail, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const resendVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationEmail = verifyEmail(email, user.verificationToken);

  await sendEmail(verificationEmail);

  res.status(200).json({
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
