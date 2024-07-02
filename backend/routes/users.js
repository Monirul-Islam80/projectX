const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
} = require("../controllers/UserController");
const auth = require("../middleware/auth");
const { adminRole } = require("../middleware/roles");

router.post("/register", register);
router.post("/login", login);
router.delete("/deleteuser/:id", auth, adminRole, deleteUser);
module.exports = router;
