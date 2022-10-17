const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserProfile,
  authUser,
  deleteUser,
  registerUser,
} = require("../controllers/userController");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

//********PUBLIC ROUTES********//

//-- authUser
//-- registerUser
//-- getUserProfile -- with token

//********ADMIN ROUTES********//

//-- deleteUser
//-- getUsers

module.exports = router;
