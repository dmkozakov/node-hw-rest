const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const AuthService = require("../services/AuthService");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError(401, "Email or password invalid");
  }

  const result = await AuthService.login(user._id);
  const token = result?.token;

  if (!token) {
    throw HttpError(401);
  }

  res.status(200).json({
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
