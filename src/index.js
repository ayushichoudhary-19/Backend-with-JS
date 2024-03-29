import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error: ", error);
        throw error;
    });

    const server = app.listen( 0, () => {
        const port = server.address().port;
        console.log(`⚙️ Server is running at port: ${port}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection error: ", error);
});
