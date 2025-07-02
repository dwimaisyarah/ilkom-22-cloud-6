export class ApiError extends Error{
    constructor(statusCode=500, msg ='something went wrong'){
        super(msg);
        this.statusCode = statusCode;
        this.message = msg;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}