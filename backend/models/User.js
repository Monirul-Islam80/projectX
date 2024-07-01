const db = require("../config/db");
class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  static async create(user) {
    const [result] = await db.execute(
      "INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)",
      [user.username, user.email, user.password, user.role]
    );
    return result;
  }
  static async findByEmail(email) {
    const [row] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return row[0];
  }
}

module.exports = User;
