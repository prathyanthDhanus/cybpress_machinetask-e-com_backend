const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const auth = require("./src/app/auth/route");
const category = require("./src/app/category/route");
const product = require("./src/app/product/route");
const variant = require("./src/app/variant/route");
const cart = require("./src/app/cart/route");

//Middlewares
app.use(express.json());
app.use(cors());

//Router middlewares
app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/variant", variant);
app.use("/api/cart", cart);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
