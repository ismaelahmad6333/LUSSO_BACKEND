const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    //user:{}
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      lowercase: true,
      enum: ["men", "women", "kids"],
    },
    brand: {
      type: String,
      default: "Lusso",
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
