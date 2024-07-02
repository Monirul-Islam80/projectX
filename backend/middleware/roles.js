const adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, Admin only!!" });
  }
  next();
};

const writerRole = (req, res, next) => {
  if (req.user.role !== "writer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { adminRole, writerRole };
