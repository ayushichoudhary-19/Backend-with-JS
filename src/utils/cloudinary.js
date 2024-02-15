// files already uploaded on server by now
// server files will come to me through the server using a local path
// local path means the path of the file on the server, i.e., local storage
// from server we'll take the file path, upload it on cloudinary and then save the cloudinary url in the database
// after this we will delete the file from the server/local storage

import { v2 as cloudinary} from "cloudinary";
import fs from "fs";
// fs is file system module of node.js
// we need not install it separately, it comes with node.js
// we use fs to read/write/update/delete files on the server

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// we make a method that takes path of the file on the server and uploads it to cloudinary
// then after upload, delete it from server by unlinking it
const uploadToCloudinary = async(localFilePath) => {
    try{
        //if file path DNE
        if(!localFilePath)  return null;
        
        //upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        // upload has many parameters like: public_id, tags, resource_type, etc
        // resource_type is auto, so cloudinary will automatically detect the resource type

     // file has been uploaded to cloudinary successfully
     console.log("File uploaded to cloudinary successfully");
    //   upload will take some time, so we need to wait for it to complete so we use await
    console.log(response.url); // url of the file uploaded to cloudinary
    return response;
    }
   
    catch(error){
        // if we are in catch block, means there is some error in uploading the file to cloudinary
        // so we remove the file from the server
        // for safe cleaning purpose
        fs.unlinkSync(localFilePath);
        // remove file from server/locally saved file       

        return null;
    }
}
