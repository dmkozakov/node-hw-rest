const { HttpError } = require("../../helpers");
const { AuthService } = require("../../services");

const logout = async (req, res) => {
  const result = await AuthService.logout(req);

  if (!result) {
    throw HttpError(400);
  }
  res.status(204).send();
};

module.exports = logout;
