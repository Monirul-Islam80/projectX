const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
