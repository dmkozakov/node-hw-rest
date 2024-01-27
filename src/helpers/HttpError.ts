interface ErrorList {
  [x: number]: string;
}

const errorMessageList: ErrorList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static set(status: number, message: string = errorMessageList[status]) {
    return new HttpError(status, message);
  }
}

export default HttpError;
