const express = require("express");
const auth = require("../middleware/auth");
const {
  createComment,
  deleteComment,
  getAllComments,
} = require("../controllers/CommentController");
const router = express.Router();
router.get("/comments/:postId", getAllComments);
router.post("/createcomment", auth, createComment);
router.delete("/deletecomment/:id", auth, deleteComment);
module.exports = router;
