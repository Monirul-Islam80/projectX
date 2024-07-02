const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorhandler");
const path = require("path");
const auth = require("./middleware/auth");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/otherside/users", require("./routes/users"));

app.use("/otherside/posts", require("./routes/posts"));
app.use("/otherside/comments", require("./routes/comment"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
