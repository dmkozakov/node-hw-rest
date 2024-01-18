export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static setHttpError(status: number, message: string) {
    return new HttpError(status, message);
  }
}
