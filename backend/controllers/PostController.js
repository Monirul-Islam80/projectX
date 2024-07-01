const { json } = require("body-parser");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, keywords, content } = req.body;
  const post = new Post(null, title, keywords, content, req.user.id);
  try {
    await Post.create(post);
    res.status(201).json({ message: "post created successfuly " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllPost = async (req, res) => {
  try {
    console.log("helo");

    const posts = await Post.findAllPost();
    console.log(posts);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
