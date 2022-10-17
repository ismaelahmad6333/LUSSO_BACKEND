const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");

////GET ALL USERS
///// GET METHOD | /api/users - PRIVATE ROUTES -> Admin
/// admin@gmail.com || pass: 1234
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//// - AUTH USER & GET TOKEN
//// - POST METHOD | /api/users/:id - PUBLIC ROUTES
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//// - USER PROFILE
//// - GET METHOD | /api/users/profile - PUBLIC ROUTES -> with token
const getUserProfile = asyncHandler(async (req, res) => {
  // const {email,password} =req.body
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      address: user.address,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//// - DELETE USER
///// DELETE METHOD | /api/users/:id - PRIVATE ROUTES -> Admin
const deleteUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const user = await User.findByIdAndRemove(req.params.id);
  res.json({ message: `User id:${req.params.id} removed` });
});

//// - REGISTER A NEW USER
///// POST METHOD | /api/users - PUBLiC ROUTES -> Admin
const registerUser = asyncHandler(async (req, res) => {
  const { name, address, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }
  const user = await User.create({
    name,
    email,
    address,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      address: user.address,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  authUser,
  getUserProfile,
  getUsers,
  deleteUser,
  registerUser,
};
