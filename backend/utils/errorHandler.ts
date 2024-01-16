/**
 * @super - It will call the parent constructor. In this case it will set the errMessage in parent Error class.
 * When we'll create a object with this class that will have the statusCode in this class and errMessage which we have passed in parent class.
 */

class ErrorHandler extends Error {
  statusCode: number;
  constructor(errMessage: string, statusCode: number) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
