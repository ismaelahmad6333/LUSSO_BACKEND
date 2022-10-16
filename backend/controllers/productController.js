const asyncHandler = require("express-async-handler");

//// - GET ALL PRODUCTS
//// - GET METHOD | /api/products - PUBLIC ROUTE
const getProducts = asyncHandler(async (req, res) => {
  res.json({ message: "All products" });
  console.log("hello");
});

//// - GET SINGLE PRODUCT
//// - GET METHOD | /api/products/:id - PUBLIC ROUTE
const getProductById = asyncHandler(async (req, res) => {
  res.json({ message: "single product" });
});

//// - DELETE PRODUCT
//// - DELETE METHOD | /api/products/:id - PRIVATE ROUTE > For admin only
const deleteProduct = asyncHandler(async (req, res) => {
  res.json({ message: "delete product" });
});

//// - CREATE PRODUCT
//// - POST METHOD | /api/products - PRIVATE ROUTE > For admin only
const createProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Create product" });
});
//// - UPDATE PRODUCT
//// - PUT METHOD | /api/products/:id - PRIVATE ROUTE > For admin only
const updateProduct = asyncHandler(async (req, res) => {
  res.json({ message: "Update product" });
});

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
