const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors');


const errorMiddleware = require("./middleware/error");


// Config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cors({
    origin: ["https://ecommerce-client-brown.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}));


// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname,"../frontend/build")));

// app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })



// Middleware for Errors
app.use(errorMiddleware);

module.exports = app