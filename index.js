const express = require("express");
const genreRouter = require("./routes/genres");
const app = express();

// Middleware to parse the body
app.use(express.json());

// Routes
app.use("/api/genres", genreRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
