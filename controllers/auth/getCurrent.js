const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    code: 200,
    data: { email, subscription },
  });
};

module.exports = getCurrent;
