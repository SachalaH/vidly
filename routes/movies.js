const { Movie, validateMovie } = require("../models/movie");
const express = require("express");
const { Genre } = require("../models/genre");
const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  // res.status(200).send(genres);
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

movieRouter.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send(`The movie with given ID=${req.params.id} is not found.`);
  res.send(movie);
});

movieRouter.post("/", async (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // get the genre sent in the request
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre.");
  //create movie
  let newMovie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  //save new genre
  newMovie = await newMovie.save();
  //send it back to client
  res.send(newMovie);
});

movieRouter.delete("/:id", async (req, res) => {
  const result = await Movie.findByIdAndRemove(req.params.id);
  res.send(result);
});

module.exports = movieRouter;
