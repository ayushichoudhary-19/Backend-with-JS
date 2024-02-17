import {asyncHandler} from '../utils/asyncHandler.js';


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    });
    // response is sent in json format
    // now this method is called in the route when the user hits the particular route
    // so for this we create a route in the routes folder
})


export {registerUser}