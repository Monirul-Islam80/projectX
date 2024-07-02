const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  const { content, postId, reply } = req.body;
  const comment = new Comment(null, content, postId, req.user.id, null, reply);
  try {
    await Comment.createComment(comment);
    res.status(201).json({ message: "comment added successfuly " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await Comment.findAllCommentByPostId(postId);
    if (!result) return res.status(404).json({ message: "0 comments" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Comment.deleteComment(id, req.user.id);
    if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ error: "You can only delete your own comments" });
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
