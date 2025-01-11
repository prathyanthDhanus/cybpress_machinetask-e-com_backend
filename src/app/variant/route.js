const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const Variant = require("./controller");

router.post(
  "/",
  authMiddleware(["admin"]),
  upload.array("images", 5),
  tryCatch(Variant.createVariant)
);

router.get(
  "/product",
  authMiddleware(["admin","user"]),
  tryCatch(Variant.getVariantsByProductId)
);

router.put(
  "/:variantId",
  authMiddleware(["admin"]),
  upload.array("images", 5),
  tryCatch(Variant.updateVariantById)
);

router.delete(
  "/:variantId",
  authMiddleware(["admin"]),
  tryCatch(Variant.deleteVariantById)
);

module.exports = router;
