"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const errorMessageList = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
};
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static set(status, message = errorMessageList[status]) {
        return new HttpError(status, message);
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=HttpError.js.map