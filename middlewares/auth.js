const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const { User } = require("../models");
const { HttpError } = require("../helpers");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).exec();

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
