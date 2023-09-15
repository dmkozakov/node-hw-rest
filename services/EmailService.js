const { User } = require("../models");

class EmailService {
  async verify(id) {
    const result = await User.findByIdAndUpdate(
      id,
      { verify: true, verificationToken: null },
      { new: true }
    ).exec();

    return result || null;
  }
}

module.exports = new EmailService();
