const AppError = require("../../../middlewares/appError");
const Cart = require("../model/cartSchema");

module.exports = {
  //  ===================== add to cart =========================

  addToCartDb: async (cartData) => {
    const { variantId, userId,quantity,price } = cartData;
    const userCart = await Cart.findOne({ userId: userId });
   
    if (userCart) {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.variantId.toString() === variantId
      );

      if (existingItemIndex !== -1) {
        // Update quantity and price for existing item
        // userCart.items[existingItemIndex].quantity += quantity;
        // userCart.items[existingItemIndex].price = price;
        throw new AppError(
          "Product already exists in the cart",
          "Field validation error: Duplicate product in cart",
          409
        );
      } else {
        // Add new item to cart
        userCart.items.push({ variantId, quantity, price });
      }

      // Recalculate totalAmount
      userCart.totalAmount = userCart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      await userCart.save();
      return userCart;
    } else {
      const newCart = new Cart({
        userId,
        items: [{ variantId, quantity, price }],
        totalAmount: quantity * price,
      });

      await newCart.save();
      return newCart;
    }
  },

  // ===================== get all products from a user's cart =========================

  getUserCartDb: async (userId) => {
    const findUserCart = await Cart.find({userId:userId})  .populate({
      path: 'items.variantId', 
      model: 'Variant',
    });;
    if (!findUserCart) {
      throw new AppError(
        "Products not found",
        "Data not found : No products available. Please add some products.",
        404
      );
    }
    return findUserCart;
  },

  // ===================== update cart =========================

  updateCartDb: async ({ userId, variantId, quantity, price }) => {
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      throw new AppError(
        "Cart not found",
        "Data not found: Cart does not exist for the user.",
        404
      );
    }

    const existingItemIndex = userCart.items.findIndex(
      (item) => item.variantId.toString() === variantId
    );

    if (existingItemIndex === -1) {
      throw new AppError(
        "Product not found in cart",
        "Data not found: Product does not exist in the cart.",
        404
      );
    }

    userCart.items[existingItemIndex].quantity = quantity;
    userCart.items[existingItemIndex].price = price;

    userCart.totalAmount = userCart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await userCart.save();
    return userCart;
  },

  // ===================== delete item from cart =========================

  deleteCartItemDb: async (userId, variantId) => {
    const userCart = await Cart.findOneAndUpdate(
      { userId }, // Find cart by userId
      { $pull: { items: { variantId } } }, // Remove the item with the matching variantId
      { new: true } // Return the updated cart after the operation
    );
  
    if (!userCart) {
      throw new AppError(
        "Cart not found",
        "Data not found: Cart does not exist for the user.",
        404
      );
    }
  
   
    userCart.totalAmount = userCart.items.reduce((acc, item) => acc + item.price, 0);
    await userCart.save();
  
    return userCart;
  }
};
