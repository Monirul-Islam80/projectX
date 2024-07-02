const db = require("../config/db");
class Post {
  constructor(
    id,
    title,
    keywords,
    content,
    image,
    authorId,
    language,
    createdAt,
    source
  ) {
    this.id = id;
    this.title = title;
    this.keywords = keywords;
    this.content = content;
    this.image = image;
    this.authorId = authorId;
    this.language = language;
    this.createdAt = createdAt;
    this.source = source;
  }
  static async create(post) {
    console.log(post);
    const [result] = await db.execute(
      "INSERT INTO posts ( title, keywords, content,image, authorId,language, createdAt, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        post.title,
        post.keywords,
        post.content,
        post.image,
        post.authorId,
        post.language,
        new Date(),
        post.source,
      ]
    );
    return result;
  }
  static async findAllPostBylang(language) {
    const [rows] = await db.execute("SELECT * FROM posts WHERE language = ?", [
      language,
    ]);

    return rows;
  }
  static async findPostById(id) {
    const [rows] = await db.execute("SELECT * FROM posts WHERE id = ?", [id]);
    return rows;
  }

  static async updatePost(post) {
    const [result] = await db.execute(
      "UPDATE posts SET title = ?, keywords = ?, content = ?, image = ?, source = ? WHERE id = ? AND authorId = ?",
      [
        post.title,
        post.keywords,
        post.content,
        post.image,
        post.source,
        post.id,
        post.authorId,
      ]
    );

    return result;
  }

  static async deletePost(id) {
    await db.execute("DELETE FROM comments WHERE postId = ?", [id]);
    await db.execute("DELETE FROM posts WHERE id = ?", [id]);
  }
}
module.exports = Post;

// const PostSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   keywords: [{ type: String }],
//   content: { type: String, required: true },
//   authorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// });
// const Post = mongoose.model("Post", PostSchema);
// module.exports = Post;
