const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { AuthService } = require("../../services");

const verify = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token }).exec();

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const result = await AuthService.verify(user._id);

  if (!result) {
    throw HttpError(400, "Unable to verify email");
  }

  res.status(200).json({
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
