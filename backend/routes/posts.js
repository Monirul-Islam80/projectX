const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createPost,
  getAllPost,
  getPostById,
} = require("../controllers/PostController");
router.post("/createpost", authMiddleware, createPost);
router.get("/", getAllPost);
router.get("/:id", getPostById);
module.exports = router;
