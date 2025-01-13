const express = require("express");
const router = express.Router();
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const Cart = require("./controller");

router.post("/user", authMiddleware(["user"]), tryCatch(Cart.addToCart));

router.get("/user", authMiddleware(["user"]), tryCatch(Cart.getUserCart));

router.put("/user", authMiddleware(["user"]), tryCatch(Cart.updateCart));

router.delete("/user/:variantid", authMiddleware(["user"]), tryCatch(Cart.deleteCartItem));

module.exports = router;
