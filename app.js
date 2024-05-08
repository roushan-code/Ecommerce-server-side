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

// let's tackle cors
const corsOptions ={
    origin:'*', 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}));

// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//       next();
//     });



// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

// app.use(express.static(path.join(__dirname,"../frontend/build")));

// app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })



// Middleware for Errors
app.use(errorMiddleware);

module.exports = app