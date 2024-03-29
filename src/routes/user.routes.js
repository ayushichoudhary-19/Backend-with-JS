//express gives us the router method to create a new router object  
 import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
 const router  = Router();
 // similar to the app object we have in the main file

// from app.js we know that we use app.use() to use middlewares
// which sends the control to userRouter

    router.route("/register").post(registerUser)
    //so we need to go to '/users' or 'register'?
    //so first user goes to /users and then to /register so the complete route is /users/register

    //fields is used to upload array of files
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1}
    ])
 export default router;

 // where do we import this router object?
 // in the main file where we have the app object


