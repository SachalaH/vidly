const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const genreRouter = require("./routes/genres");
const app = express();
const mongoose = require("mongoose");
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

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected to the database..");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
