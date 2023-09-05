const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.status(201).json(result);
};

module.exports = updateSubscription;
