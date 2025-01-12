const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const Category = require("../../app/category/controller");



router.post("/",authMiddleware(["admin"]),upload.single("image"),tryCatch(Category.createCategory));

router.get("/",tryCatch(Category.getAllCategories));
router.get("/:categoryId",authMiddleware(["admin"]),tryCatch(Category.getCategoryById));

router.put("/:categoryId",authMiddleware(["admin"]),upload.single("image"),Category.updateCategory);

router.delete("/:categoryId",authMiddleware(["admin"]),Category.deleteCategory);




module.exports = router;