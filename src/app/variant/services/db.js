const Variant = require("../model/variantSchema");
const AppError = require("../../../middlewares/appError");
const cloudinary = require("../../../utils/cloudinary");

module.exports = {
  //  ===================== get all products =========================

  createVariantDb: async (variantData) => {
    const { productId, color } = variantData;

    const findvariant = await Variant.findOne({
      productId: productId,
      color: color,
    });

    if (findvariant.length === 0) {
      throw new AppError(
        "Variant already exists",
        "Field validation error : A variant with this product and color already exists",
        409
      );
    }
    const saveVariant = new Variant({
      ...variantData,
    });
    await saveVariant.save();
    return saveVariant;
  },

  //  ===================== get variants by product id =========================

  getVariantsByProductIdDb: async (productId) => {
    const findvariants = await Variant.find({ productId: productId });

    if (findvariants.length === 0) {
      throw new AppError(
        "Variants not found",
        "Data not found : No variants available. Please add some variants.",
        404
      );
    }
    return findvariants;
  },

  //  ===================== update variant by id =========================

  updateVariantByIdDb: async (variantData) => {
    const { variantId, images } = variantData;
    const updateVarinat = await Variant.findByIdAndUpdate(
      variantId,
      { ...variantData, images: images.length > 0 ? images : undefined },
      { new: true }
    );

    if (!updateVarinat) {
      throw new AppError(
        "Variant not found",
        "Data not found : Variant does not exist.",
        404
      );
    }

    return variantData;
  },

  //  ===================== delete variant by id =========================

  deleteVariantByIdDb: async (variantId) => {
    const variant = await Variant.findById(variantId);

    if (!variant) {
      throw new AppError(
        "Variant not found",
        "Data not found: Variant does not exist.",
        404
      );
    }

    // Delete images from Cloudinary
    if (variant.images && variant.images.length > 0) {
      const deleteImagePromises = variant.images.map(async (image) => {
        const publicId = image.url.split("/").pop().split(".")[0]; // Extract public ID from the URL
        await cloudinary.uploader.destroy(publicId); // Delete image from Cloudinary
      });

      // Wait for all images to be deleted from Cloudinary
      await Promise.all(deleteImagePromises);
    }

    const removeVariant = await Variant.findByIdAndDelete(variantId);

    if (!removeVariant) {
      throw new AppError(
        "Variant not found",
        "Data not found: Variant does not exist.",
        404
      );
    }

    return removeVariant;
  },
};
