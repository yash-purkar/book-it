/**
 * @super - It will call the parent constructor. In this case it will set the errMessage in parent Error class.
 */

class ErrorHandler extends Error {
    statusCode:number;
    constructor(errMessage:string,statusCode:number){
        super(errMessage),
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;