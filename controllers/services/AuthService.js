const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { JWT_SECRET } = process.env;

class AuthService {
  async register(req) {
    const { email, password, subscription } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, subscription });

    return newUser || null;
  }

  async login(id) {
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    const result = await User.findByIdAndUpdate(id, { token }, { new: true }).exec();

    return result || null;
  }

  async logout(req) {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, { token: null }, { new: true });
    return result || null;
  }

  async updateSubscription(req) {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    return result || null;
  }
}

module.exports = new AuthService();
