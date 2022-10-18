const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { addItemTocart } = require("../controllers/cartController");

router.route("/").post(protect, addItemTocart);

module.exports = router;
