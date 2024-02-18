import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        //to make any field serachable in mongoDb we use index: true
        // here index: true is used to make username field searchablee
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary image url will be saved here
        required: [true, "Avatar is required"],
    },
    colverImage: {
        type: String, //cloudinary image url will be saved here
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password: {
        type: String, //this will be encrypted/hashed using bcrypt
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
},
{   timestamps: true
    //timestamps: true will automatically add createdAt and updatedAt fields
} 
);


// jwt is used to create tokens
// tokens are used to authenticate user and used to give access to users for a specific period of time
// jwt - json web token
// payload - data that we want to send in the token
// eg: user id, username, email, etc
// secret - used to sign the token
// eg: "mysecret" this protects the token from being modified by anyone
// options - used to set the expiry time of the token

// direct encryption is not used because it is not scalable/possible
// so we take help from some hooks like pre, post, etc of mongoose
// hooks are used to perform some operations before or after the operation
// here we are using pre hook of mongoose
// pre hook is used to perform some operations before saving the data to the database
// here we are using pre hook to encrypt the password before saving it to the database
// we are using bcrypt to encrypt the password

userSchema.pre("save", async function (next) {
// means before saving the data to the database do the following operations
// here we are using normal function instead of arrow function because arrow function does not have its own this keyword
// and we need this keyword to access the model's data
// async function is used because encryption and all takes time
// so we need to wait for the encryption to complete
// next is used to move to the next operation from current middleware


    // here before saving the password to the database we are encrypting it

    if(!this.isModified("password")) return next(); // if the password is not modified then do not encrypt it again

    this.password = await bcrypt.hash(this.password,8); //8 is the number of rounds of encryption means how many times the password will be encrypted
    next(); // move to the next operation
    // but when we save the data to the database the password will be encrypted
    // eg. if someone changes anything like their avatar, email, etc then the password will be encrypted again on saving the data
    // so we need to specify that if the password is not modified then do not encrypt it again
    // so we use isModified() method of mongoose
    // isModified() is used to check if the field is modified or not
})  

// now we need to make a method to compare the password
// because when the user logs in we need to compare the password entered by the user with the password saved in the database encrypted

userSchema.methods.isPasswordCorrect = async function(password){
    // bcrypt encrypts also and then can compare the password
   return await bcrypt.compare(password, this.password);
    // this.password is the encrypted password saved in the database
    // password is the password entered by the user
    // compare() returns true/false
}

// both access and refresh tokens are jwt tokens
// sign method of jwt is used to create the token
// we give it a payload which is the data that we want to send in the token
userSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        //secret
        process.env.ACCESS_TOKEN_SECRET,
        // ACCESS_TOKEN_SECRET is used to sign the token
        // it is used to protect the token from being modified by anyone

        //expiry time
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
    {
        _id: this._id,
        //since the refresh token is used to refresh the access token again and again
        // we do not need to send the email, username, etc in the refresh token
        // so we only send the user id in the refresh token
        // because the user id is the only thing that is needed to refresh the access token
    
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
   )
   
}


// JWT is a bearer token
// means whoever has the token can access the resources
// so we need to protect the token from being stolen
// so we use refresh token
// refresh token is used to refresh the token
// refresh token is used to get a new token

export const  User = mongoose.model("User", userSchema)