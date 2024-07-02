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
  static async findAllUser() {
    const [row] = await db.execute("SELECT * FROM users");
    return row;
  }
  static async findByEmail(email) {
    const [row] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return row[0];
  }
  static async findUserById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }
  static async deleteUser(id) {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
  }
}

module.exports = User;
