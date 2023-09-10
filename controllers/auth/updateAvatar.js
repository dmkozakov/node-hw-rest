const { HttpError } = require("../../helpers");
const { AuthService } = require("../../services");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missing avatar file");
  }

  const result = await AuthService.updateAvatar(req);
  const avatarURL = result?.avatarURL;

  if (!result) {
    throw HttpError(401, "Unable to update avatar, try again later");
  }

  res.status(200).json({ code: 200, data: { avatarURL } });
};

module.exports = updateAvatar;
