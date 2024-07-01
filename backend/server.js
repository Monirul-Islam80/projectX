const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorhandler");

const app = express();

const port = 5000;
app.use(bodyParser.json());
app.use("/otherside/users", require("./routes/users"));
app.use("/otherside/posts", require("./routes/posts"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
