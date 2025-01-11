const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const auth = require("./src/app/auth/route");
const category = require("./src/app/category/route");

//Middlewares
app.use(express.json());
app.use(cors());


//Router middlewares
app.use("/api/auth",auth);
app.use("/api/category",category);


// Error handling middleware
app.use(errorHandler);

module.exports = app;
