const Product = require("./models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const products = require("./products");
const users = require("./users");
const User = require("./models/userModels");

connectDB();

const productSeeds = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("DATA IMPORTED");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

productSeeds();
