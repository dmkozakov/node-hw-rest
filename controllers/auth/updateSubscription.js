const { HttpError } = require("../../helpers");
const { AuthService } = require("../../services");

const updateSubscription = async (req, res) => {
  const result = await AuthService.updateSubscription(req);

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json({ code: 201, data: result });
};

module.exports = updateSubscription;
