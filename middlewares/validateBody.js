const { HttpError } = require("../helpers");

const validateBody = schema => {
  const func = (req, _, next) => {
    console.log(req.file);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
