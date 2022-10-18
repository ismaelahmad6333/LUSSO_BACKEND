const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

//// - ADD ITEM TO CART
//// - POST METHOD | /api/orders - PUBLIC ROUTE -> with token
const addItemTocart = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    isPaid,
    paitAt,
    isDelivered,
    deliveredAt,
  } = req.body;
  if (cartItems && cartItems.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  } else {
    const cart = new Cart({
      cartItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      isPaid,
      paitAt,
      isDelivered,
      deliveredAt,
    });
    const addedItem = await cart.save();
    res.status(201).json(addedItem);
  }
});

module.exports = { addItemTocart };
