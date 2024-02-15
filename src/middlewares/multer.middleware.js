// multer is a middleware for handling multipart/form-data, 
// which is primarily used for uploading files.
// firstly we need to install multer, then import it in the file where we want to use it
// then we need to make an instance of multer and configure it
// then we can use it as a middleware in the route where we want to upload the file
// we need middleware because we need to handle the file before it is uploaded to the server
// it is done to prevent the server from crashing in case of large files or invalid file types

import multer from "multer";
// then to multer you set its destination and filename
// destination is the path/folder where the file will be saved
// filename is the name of the file
// we can save single or multiple files in form of an array
// memory storage is used to store the file in memory
// files can be saved in both disk and memory
// but disk storage is used here instead of memory storage here



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, ".public/temp");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

export const upload = multer({storage});
// we have made an instance of multer and configured it
// means we have set the destination and filename
// now we can use it as a middleware in the route where we want to upload the file
// after configuring multer, at last we need to export it so that we can use it in other files
// const upload =multer({storage: storage}); means we have made an instance of multer and configured it
// in Es6 we can write it as export const upload = multer({storage}); otherwise we need to write it as module.exports=multer({storage: storage}); also


// so from here we can get the local path of the file to upload it to cloudinary through cloudinary.js  
