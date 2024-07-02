const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log("--", decode);
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
