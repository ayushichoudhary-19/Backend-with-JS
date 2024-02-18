import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object as in mongoDb data is stored in the form of objects  - create entry in the database
    // we have to send response to the frontend - but remove the password and response token from the response
    // check for user creation
    // return response to the frontend


    const {fullname,email,username,password} = req.body() // this will give us the user details from the frontend
    console.log("email",email);

    //validation
    if( [fullname,email,username,password].some((field) => field?.trim() === ""))
    {
        // some is a method which checks if any of the fields is empty or not
        throw new ApiError(400, "All fields are required");
    }



    // response is sent in json format
    // now this method is called in the route when the user hits the particular route
    // so for this we create a route in the routes folder
})


export {registerUser}