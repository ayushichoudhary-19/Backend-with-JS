import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app= express()


// for middleware to work, we need to use app.use()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
    // credentials is set to true to allow the server to set cookies on the client
}))

app.use(express.json({
    limit: "16kb"  
    //limit is set to set a limit on number of json files that can be sent to the server to prevent DDOS attacks
    // ddos attacks are when a server is overwhelmed with requests
}))

// urlencoded is used to handle data sent from forms in the frontend and 
// to handle query strings in the url as some urls can have different way of sending data
// like using + instead of %20 for spaces
// thus urlencoded is used to handle such data
app.use(express.urlencoded({
    extended: true,
    // extended is set to true to allow for nested objects in query strings
    limit: "16kb"
}))

// express.static() is used to serve static files like images, css and js files
// means that the files in the public folder can be accessed by the client 
app.use(express.static("public"))


// cookieParser is used to parse cookies from the client
// means server can read cookies from the client and send cookies to the client
app.use(cookieParser())  //in this we do not need to  usually pass any options to cookieParser


// middlewares are functions that run before the route handler
// means if we call a url with route /instagram then before server can handle the request and send a res.send() or res.json() response
// we need a middleware to check if the user is authenticated or not 
// or to check if the user has the right to access the route
// or to check limit on the number of requests a user can make to the server to prevent DDOS attacks
// thus middlewares are used to run some code before the server can handle the request
//  compute power of server is saved by using middlewares


// routes

import userRouter from "./routes/user.routes.js"

// routes declaration
// we used to use app.get() or app.post() to declare routes
// but now since route is in separate file, we use middleware and app.use() to use the route
app.use("/api/v1/users", userRouter);
// as soon as user goes to route users, the control is transferred to userRouter
// http://localhost:7000/api/v1/users/register



export {app}