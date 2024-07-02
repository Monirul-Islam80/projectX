const db = require("../config/db");

class Comment {
  constructor(id, content, postId, userId, createdAt, reply) {
    this.id = id;
    this.content = content;
    this.postId = postId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.reply = reply;
  }
  static async createComment(comment) {
    const [result] = await db.execute(
      "INSERT INTO comments (content,postId,userId,createdAt,reply) VALUES (?, ?, ?, ?, ?)",
      [
        comment.content,
        comment.postId,
        comment.userId,
        new Date(),
        comment.reply === undefined ? null : comment.reply,
      ]
    );
    return result;
  }
  static async findAllCommentByPostId(postId) {
    const [row] = await db.execute("SELECT * FROM comments WHERE postId = ?", [
      postId,
    ]);
    return row[0];
  }

  static async deleteComment(id, userId) {
    const [result] = await db.execute(
      "DELETE FROM comments WHERE id = ? AND userId = ?",
      [id, userId]
    );
    return result;
  }
}

module.exports = Comment;
