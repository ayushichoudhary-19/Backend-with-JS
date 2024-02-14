// nodejs does not have a default response class
// so we can't exted the default response class to create our own response class
// but we can create our own ApiResponse class to handle responses
// like this:

class ApiResponse {
    constructor(statusCode, message="Success", data, success){
        // super is not used here because we are not extending any class here
        // as there is no parent class of ApiResponse in Nodejs
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400
        // success is set to true if statusCode is less than 400 as this range is for success
        // any statusCode greater than 400 is for error
        
        // statusCode ranges from 200 to 500
        // 200-299 is for success; 100-199 is for informational; 
        // 300-399 is for redirection; 400-499 is for client errors; 
        // 500-599 is for server errors
    }
}
