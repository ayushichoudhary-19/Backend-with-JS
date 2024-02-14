// format of class in js is:
// class ClassName {
    // constructor(){
        // this.property = value
        // this.property = value
        // ...
    // }
// }

// inside constructor too, we can pass arguments
// constructor(arg1, arg2, arg3){}
// in our case, we are passing 4 arguments to the constructor
// constructor(statusCode, message, error, stack){}

// statusCode is the status code of the error means 404, 500, 400 etc
// this is used to send the status code to the client
// status code indicates the status of the request:
//  404 means not found, 500 means server error, 400 means bad request

// message is the message that we want to send to the client
// in case there is no message from the server, 
// we can send a default message to the client saying "Something went wrong"

// error is an array of errors that we want to send to the client
// this array can have multiple errors like email not found, password incorrect etc

// stack is the stack trace of the error
// means the line number and file name where the error occured 
// this is used for debugging purposes

// Nodejs has a default error class; this error class is called Error
// we can extend the Error class to create our own error class
// so that we can add additional properties to the error class
// like statusCode, message, error, stack etc
// the default error class does not have these properties
// it only has message and stack properties
// default error class looks like: 
// class Error {
    // constructor(message){
        // this.message = message
        // this.stack = stack
    // }

// we can extend the default error class to create our own error class
// like this:

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message) //super is used to call the constructor of the parent class
        // here, we are passing the message to the constructor of the parent class
        // not the statusCode, error or stack because the parent class does not have these properties
        // the parent class only has message and stack properties
        // which is parent class here? the parent class here is the default error class
        // the APIError is not the parent class here it is the child class of the default error class
        // so from our APIError class, we are calling the constructor of the default error class
        // and passing the message to it
        // remember that the default error class does not have statusCode, error or stack properties
        // so we are not passing these properties to the constructor of the default error class

        // when this message is passed to  the constructor of the default error class

        // As the default error class looks like: 
        // class Error {
            // constructor(message){
                // this.message = message
                // this.stack = stack
            // }
        
        // the message is stored in the message property of the default error class
        // and the stack trace of the error is stored in the stack property of the default error class

    
        this.statusCode = statusCode
        this.data = null
        // this.data is set to null here; this is something related to nodejs 
        // an error may carry additional data, which is irrelevant to the client
        // so we set this.data to null to avoid sending data to the client
        // this this is done to avoid sending data/sensitive info to the client if there is an error
        
        this.message = message
        this.success = false  //because we are handling errors here and not API responses
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            // in captureStackTrace we pass the instance of the error class and the constructor of the error class
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export {ApiError}
// alternate way to export is:
// export default ApiError 
// both ways are correct
