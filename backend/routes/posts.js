const express = require("express");
const auth = require("../middleware/auth");
const {
  CreatePost,
  UpdatePost,
  DeletePost,
  GetAllPostByLang,
  GetPostById,
} = require("../controllers/PostController");

const { writerRole, adminRole } = require("../middleware/roles");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/createpost",
  auth,
  writerRole,
  upload.single("image"),
  CreatePost
);
router.put(
  "/updatepost/:id",
  auth,
  writerRole,
  upload.single("image"),
  UpdatePost
);
router.delete("/deletepost/:id", auth, adminRole, DeletePost);
router.get("/bylanguage/:language", GetAllPostByLang);
router.get("/byid/:id", GetPostById);
module.exports = router;
