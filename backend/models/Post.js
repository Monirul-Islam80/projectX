const db = require("../config/db");
class Post {
  constructor(id, title, keywords, content, authorId, createdAt) {
    this.id = id;
    this.title = title;
    this.keywords = keywords;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
  }
  static async create(post) {
    console.log(post);
    const [result] = await db.execute(
      "INSERT INTO posts ( title, keywords, content, authorId, createdAt) VALUES (?, ?, ?, ?, ?)",
      [post.title, post.keywords, post.content, post.authorId, new Date()]
    );
    return result;
  }
  static async findAllPost() {
    const [rows] = await db.execute("SELECT * FROM posts");
    console.log(rows);
    return rows;
  }
  static async findPostById(id) {
    const [row] = await db.execute("SELECT * FROM posts WHERE id = ?", [id]);
    return row[0];
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
