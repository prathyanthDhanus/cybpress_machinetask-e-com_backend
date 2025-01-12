const express = require("express");
const router = express.Router();
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("./controller");
const Token = require("./services/common");

router.post("/register",tryCatch(User.registerAuth));
router.post("/login",tryCatch(User.loginAuth));
router.post("/refresh-token",tryCatch(Token.userRefreshToken));

















module.exports = router;