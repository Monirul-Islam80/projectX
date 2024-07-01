const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log(req);
  const { username, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const user = new User(null, username, email, hashpassword, role);
  try {
    await User.create(user);

    res.status(201).json({ user: { username, email, role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);

    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const duser = {
      username: user.username,
      email: user.email,
    };
    res.status(200).json({ token, duser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
