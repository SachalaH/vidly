const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const genreRouter = require("./routes/genres");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/genres", genreRouter);

app.get("/", (req, res) => {
  res.send("Hello Welcome to Vidly!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
