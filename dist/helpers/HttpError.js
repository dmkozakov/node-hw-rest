"use strict";
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
module.exports = HttpError;
//# sourceMappingURL=HttpError.js.map