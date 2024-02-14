// aysncHandler.js of utils folder is used to handle async functions in the code
// means if we have a function that returns a promise then we can use asyncHandler to handle the promise
//  this is done to avoid using try and catch block in every async function

//  PROMISE HANDLER
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}



// TRY-CATCH HANDLER


// const asyncHandle = (fn) => async(req,res,next) =>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             messase: error.message || "Server Error"
//         })   
//     }
// }


// export default asyncHandler;