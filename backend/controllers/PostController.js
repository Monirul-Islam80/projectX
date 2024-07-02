const Post = require("../models/Post");
const path = require("path");
const fs = require("fs");
exports.CreatePost = async (req, res) => {
  const { title, keywords, content, source, language } = req.body;
  const image = req.file ? req.file.filename : null;
  const post = new Post(
    null,
    title,
    keywords,
    content,
    image,
    req.user.id,
    language,
    null,
    source
  );
  try {
    await Post.create(post);
    res.status(201).json({ message: "post created successfuly " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.GetAllPostByLang = async (req, res) => {
  try {
    const posts = await Post.findAllPostBylang(req.params.language);

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.GetPostById = async (req, res) => {
  try {
    const post = await Post.findPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.UpdatePost = async (req, res) => {
  const { id } = req.params;
  const { title, keywords, content, source } = req.body;
  let image = req.file ? req.file.filename : null;
  const authorId = req.user.id;
  try {
    const post = await Post.findPostById(id);
    console.log(post);
    if (post.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "You can only update your own posts" });
    }

    if (post.image && req.file) {
      fs.unlinkSync(path.join(__dirname, "../", "uploads", post.image));
    }
    console.log(image);

    if (image === null) {
      image = post.image;
    }
    console.log(image);

    const reslut = await Post.updatePost({
      id,
      title,
      keywords,
      content,
      image,
      authorId,
      source,
    });
    console.log(reslut);
    res
      .status(201)
      .json({ post: { id, title, content, authorId: authorId, source } });
  } catch (error) {
    res.status(500).json({ error: "Error updating post", error });
  }
};

exports.DeletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findPostById(id);
    if (post.image) {
      fs.unlinkSync(path.join(__dirname, "..", "uploads", post.image));
    }

    await Post.deletePost(id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post", error });
  }
};
