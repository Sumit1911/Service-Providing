require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const app = express();

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// handling cors issue
const corsOption = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
}

app.use(cors(corsOption));

app.use(express.json());  //we can use json in this application. it is a middleware


//Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(errorMiddleware);  //define before going to live

const port = 5000;
connectDb().then(() => {  //it there will connection then server will going to listen
    app.listen(port, () => {
        console.log(`server is running at port: ${port}`);
    });
});
