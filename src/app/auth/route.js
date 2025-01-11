const express = require("express");
const router = express.Router();
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("./controller");

router.post("/register",tryCatch(User.registerAuth));
router.post("/login",tryCatch(User.loginAuth));

















module.exports = router;