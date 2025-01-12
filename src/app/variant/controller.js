const {
  createVariantDb,
  getVariantsByProductIdDb,
  updateVariantByIdDb,
  deleteVariantByIdDb,
} = require("./services/db");

module.exports = {
  //  ===================== create variant =========================

  createVariant: async (req, res) => {
    const { productId, color, stock } = req.body;
    const files = req.files;
    console.log(files.length)
    if ((!productId || !color || !stock || files.length === 0)) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const images = files.map((file) => ({
      url: file.path,
      altText: file.originalname || "",
    }));

    const variantData = { productId, color, stock, images };
    const saveVarient = await createVariantDb(variantData);
    return res.status(201).json({
      status: "success",
      message: "Varient created successfully ",
      data: saveVarient,
    });
  },

  //  ===================== get variants by product id =========================

  getVariantsByProductId: async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: Product id is required",
      });
    }

    const fetchVariants = await getVariantsByProductIdDb(productId);
    return res.status(201).json({
      status: "success",
      message: "Successfully fetched variants",
      data: fetchVariants,
    });
  },

  //  ===================== update variant by id =========================

  updateVariantById: async (req, res) => {
    const { productId, color, stock } = req.body;
    const images = req.files;
    const variantId = req.params.variantId;

    if ((!productId || !color || !stock, !images)) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    let imageData = [];
    if (images && images.length > 0) {
      imageData = images.map((image) => ({
        url: image.path,
        altText: image.originalname,
      }));
    }

    const variantData = {
      productId,
      color,
      stock,
      variantId,
      images: imageData,
    };
    const updateVariant = await updateVariantByIdDb(variantData);
    return res.status(201).json({
      status: "success",
      message: "Varient updated successfully ",
      data: updateVariant,
    });
  },

  //  ===================== delete variant by id =========================

  deleteVariantById: async (req, res) => {
    const variantId = req.params.variantId;
    const removeVariant = await deleteVariantByIdDb(variantId);
    return res.status(201).json({
      status: "success",
      message: "Varient deleted successfully ",
      data: removeVariant,
    });
  },
};
