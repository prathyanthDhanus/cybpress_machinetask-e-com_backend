const express = require("express");
const router = express.Router();
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const Category = require("../../app/category/controller");



router.post("/",authMiddleware(["admin"]),tryCatch(Category.createCategory));






module.exports = router;