import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import ApiResponse from '../utils/ApiResponse.js';

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


    const {fullname,email,username,password} = req.body // this will give us the user details from the frontend
    console.log("email",email);

    //validation
    if( [fullname,email,username,password].some((field) => field?.trim() === ""))
    {
        // some is a method which checks if any of the fields is empty or not
        throw new ApiError(400, "All fields are required");
    }
    // validating email
    // we can use regex for this
    // regex is a pattern matching tool
    if(!/^\S+@\S+\.\S+$/.test(email))
    {
        throw new ApiError(400, "Invalid email");
    }
    //test method checks if the email is in the correct format or not

    // check if user already exists
    // we can use the findOne method of the user model
    // findOne method is used to find a single document in the collection
    // it takes an object as an argument and returns the first document that matches the object
    // if no document is found, it returns null

    const existedUser = await User.findOne({
        $or: [{username},{email}] //$or is a method of mongoose which is used to find the documents which match any of the conditions
    })

    if(existedUser)
    {
        throw new ApiError(400, "User with email or username already exists");
    }

    // this will give us the files that we have uploaded to cloudinary
    // multer provides us with the files object which contains the details of the files that we have uploaded
    // the files object contains the details of the files that we have uploaded
    const avatarLocalPath = req.files?.avatar[0]?.path; // this will give us the local path of the file that we have uploaded to cloudinary
    // const coverImageLocalPath = req.files?.coverImage[0]?.path; 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
          coverImageLocalPath = req.files.coverImage[0].path;
    }
    
    // upload images to cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   if(!avatar){
         throw new ApiError(500, "Error in uploading avatar");
   }

  const user = await User.create({
    fullname, 
    avatar: avatar.url, //in db we will save only the url of the uploaded image
    converImage: coverImage?.url||"",
    email,
    password,
    username: username.toLowerCase()
   })
   const createsUser = await User.findById(user._id).select("-password -refreshToken");

   if(!createsUser){
         throw new ApiError(500, "Error in creating user");
   }

   return res.status(201).json(new ApiResponse(201, createsUser, "Registered Successfully!"));


    // response is sent in json format
    // now this method is called in the route when the user hits the particular route
    // so for this we create a route in the routes folder
})


export {registerUser}