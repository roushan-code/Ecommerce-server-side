const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database");


// Handling Uncaught Exception/Error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

// console.log(you);  // Uncaught Error


// Config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "config/config.env" });
}

// database conncect after calling dotenv.config
// Connecting to database



connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejection  ----(its occur when you change the url in config.env file like at the place of 'mongodb' -> mongo or something else)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})
