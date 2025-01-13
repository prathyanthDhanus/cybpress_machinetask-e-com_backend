const { addToCartDb, getUserCartDb,updateCartDb,deleteCartItemDb } = require("./services/db");
module.exports = {
  //  ===================== add to cart =========================

  addToCart: async (req, res) => {
    const userId = req.user.userId;
    const { variantId, quantity, price } = req.body;

    if (!variantId || !quantity || !price || !userId) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const cartData = { userId, variantId, quantity, price };
    const createCart = await addToCartDb(cartData);
    return res.status(201).json({
      status: "success",
      message: "Product successfully added to cart ",
      data: createCart,
    });
  },

  // ===================== get all products from a user's cart =========================

  getUserCart: async (req, res) => {
    const userId = req.user.userId;

    const fetchUserCart = await getUserCartDb(userId);
    return res.status(201).json({
      status: "success",
      message: "Successfully fetched user's cart ",
      data: fetchUserCart,
    });
  },

  // ===================== update cart =========================

  updateCart: async (req, res) => {
    const userId = req.user.userId;
    const { variantId, quantity, price } = req.body;

    if (!variantId || !quantity || !price || !userId) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const cartData = { userId, variantId, quantity, price };
    const updatedCart = await updateCartDb(cartData);
    return res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
      data: updatedCart,
    });
  },

  // ===================== delete item from cart =========================
  deleteCartItem: async (req, res) => {
    const userId = req.user.userId;
    // const { variantId } = req.body;
    const  variantId  = req.params.variantid;

    if (!variantId || !userId) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message:
          "Field validation error: variantId and userId are required",
      });
    }

    const deletedCart = await deleteCartItemDb(userId, variantId);
    return res.status(200).json({
      status: "success",
      message: "Item deleted successfully from cart",
      data: deletedCart,
    });
  },
};
