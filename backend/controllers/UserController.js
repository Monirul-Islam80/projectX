const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  console.log(username, email, hashpassword, role);
  const user = new User(null, username, email, hashpassword, role);
  try {
    const result = await User.create(user);

    res.status(201).json({ id: result.id, username, email, role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, username: user.username, email });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
// exports.getAllUsers=async(req,res)=>{
// try {
// const result = await User.findAllUser();
//   res.status(200).json
// } catch (error) {

// }
// }
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findUserById(req.params.id);
    console.log(user);
    if (!user) return res.status(404).json({ message: "user not found" });
    await User.deleteUser(req.params.id);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
