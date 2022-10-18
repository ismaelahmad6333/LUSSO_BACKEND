const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//// - GET ALL PRODUCTS
//// - GET METHOD | /api/products - PUBLIC ROUTE
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//// - GET SINGLE PRODUCT
//// - GET METHOD | /api/products/:id - PUBLIC ROUTE
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//// - DELETE PRODUCT
//// - DELETE METHOD | /api/products/:id - PRIVATE ROUTE > For admin only
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error(`Product id:${id} - not found `);
  }
});

//// - CREATE PRODUCT
//// - POST METHOD | /api/products - PRIVATE ROUTE > For admin only
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    stock: req.body.stock,
    image: req.file.path,
    rating: req.body.rating,
    user: req.user._id,
  });
  const createdProduct = await product.save();
  res.status(201).json({ createdProduct });
});
//// - UPDATE PRODUCT
//// - PUT METHOD | /api/products/:id - PRIVATE ROUTE > For admin only
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, brand, stock, image, rating } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.stock = stock;
    product.image = image;
    product.rating = rating;
  } else {
    res.status(404);
    throw new Error(`Product id:${req.params.id} - not found `);
  }
  res.json({ message: "Update product" });
});

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
