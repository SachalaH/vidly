const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genreRouter = require("./routes/genres");
const app = express();
const mongoose = require("mongoose");
const customerRouter = require("./routes/customers");
const movieRouter = require("./routes/movies");
const rentalRouter = require("./routes/rentals");
const userRouter = require("./routes/users");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/genres", genreRouter);
app.use("/customers", customerRouter);
app.use("/movies", movieRouter);
app.use("/rentals", rentalRouter);
app.use("/users", userRouter);

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
