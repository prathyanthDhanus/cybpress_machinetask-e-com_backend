const Product = require("../model/productSchema");
const AppError = require();

module.exports = {
  //  ===================== create product =========================

  createProductDb: async (productData) => {
    const findProduct = await Product.findOne({ name: productData.name });

    if (findProduct) {
      throw new AppError(
        "Product already exists",
        "Field validation error : A product with this product name already exists",
        409
      );
    }

    const saveProduct = new Product({
      ...productData,
    });
    await saveProduct.save();
    return saveProduct;
  },

  //  ===================== get all products =========================

  getAllProductsDb: async () => {
    const findAllProducts = await Product.find();

    if (findAllProducts.length === 0) {
      throw new AppError(
        "Products not found",
        "Data not found : No products available. Please add some products.",
        404
      );
    }
    return findAllProducts;
  },

  //  ===================== get product by id =========================

  getProductByIdDb: async (productId) => {
    const findProduct = await Product.findOne(productId);

    if (!findProduct) {
      throw new AppError(
        "Product not found",
        "Data not found : Product does not exist",
        404
      );
    }

    return findProduct;
  },

  //  ===================== update product by id =========================

  updateProductDb: async (productData, productId) => {
    const modifyProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );

    if (!modifyProduct) {
      throw new AppError(
        "Product not found",
        "Data not found : Product does not exist",
        404
      );
    }
    return modifyProduct;
  },

  //  ===================== delete product by id =========================

  deleteProductDb: async (productId) => {
    const removeProduct = await Product.findByIdAndDelete(productId);

    if (!removeProduct) {
      throw new AppError(
        "Product not found",
        "Data not found : Product does not exist",
        404
      );
    }

    return removeProduct;
  },
};
