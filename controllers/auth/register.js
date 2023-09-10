const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const AuthService = require("../services/AuthService");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, "Missing required fields");
  }

  const user = await User.findOne({ email }).exec();

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const newUser = await AuthService.register(req);

  if (!newUser) {
    throw HttpError(400, "Unable to register, try again later");
  }

  res.status(201).json({
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = register;
