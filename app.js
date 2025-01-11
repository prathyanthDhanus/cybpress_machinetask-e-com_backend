const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const auth = require("./src/app/auth/route");

//Middlewares
app.use(express.json());
app.use(cors());


//Router middleware
app.use("/api/auth",auth);



// Error handling middleware
app.use(errorHandler);

module.exports = app;
