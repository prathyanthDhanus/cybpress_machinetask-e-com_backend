const express = require("express");
const router = express.Router();
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const Product = require("./controller");


router.post("/",authMiddleware(["admin"]),tryCatch(Product.createProduct));

router.get("/category/:categoryId",tryCatch(Product.getAllProductsByCategory));
router.get("/:productId",tryCatch(Product.getProductById));

router.put("/:productId",authMiddleware(["admin"]),tryCatch(Product.updateProduct));

router.delete("/:productId",authMiddleware(["admin"]),tryCatch(Product.deleteProduct));

module.exports = router;