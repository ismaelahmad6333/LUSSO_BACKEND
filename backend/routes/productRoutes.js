const express = require("express");
const upload = require("../config/multer");
const router = express.Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/productController");
const { protect, admin } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);
router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  .get(getProductById);

//********PUBLIC ROUTES********//
//-- getProducts

//********ADMIN ROUTES********//
//-- createProduct
//-- deleteProduct
//-- updateProduct

module.exports = router;
