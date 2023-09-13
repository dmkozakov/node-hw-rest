const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const crypto = require("node:crypto");

const { User } = require("../models");
const { sendEmail, verifyEmail } = require("../helpers");
const { JWT_SECRET } = process.env;
const avatarsDir = path.join(process.cwd(), "public", "avatars");
const uploadDir = path.join(process.cwd(), "tmp");

class AuthService {
  async register(req) {
    const { email, password, subscription } = req.body;
    const avatarURL = gravatar.url(email);

    const verificationToken = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const verificationEmail = verifyEmail(email, verificationToken);

    await sendEmail(verificationEmail);

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

  async updateAvatar(req) {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const avatarPath = path.join(uploadDir, originalname);
    const resizedUpload = `${uploadDir}/resized.jpg`;

    const image = await Jimp.read(avatarPath);
    await image.resize(250, 250).writeAsync(resizedUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(resizedUpload, resultUpload);
    await fs.unlink(tmpUpload);

    const avatarURL = path.join("avatars", filename);
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();

    return result || null;
  }

  async verify(id) {
    const result = await User.findByIdAndUpdate(
      id,
      { verify: true, verificationToken: null },
      { new: true }
    ).exec();

    return result || null;
  }
}

module.exports = new AuthService();
