const { Genre, validateGenre } = require("../models/genre");
const express = require("express");
const genreRouter = express.Router();

genreRouter.get("/", async (req, res) => {
  // res.status(200).send(genres);
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

genreRouter.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID=${req.params.id} is not found.`);
  res.send(genre);
});

genreRouter.post("/", async (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create genre

  let newGenre = new Genre({ name: req.body.name });
  //save new genre
  newGenre = await newGenre.save();
  //send it back to client
  res.send(newGenre);
});

genreRouter.put("/:id", async (req, res) => {
  // find the genre send error if not found
  let genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID=${req.params.id} is not found.`);
  // validate the data
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //update the data
  genre.set({ name: req.body.name });
  genre = await genre.save();
  //send it back
  res.send(genre);
});

genreRouter.delete("/:id", async (req, res) => {
  const result = await Genre.findByIdAndRemove(req.params.id);
  res.send(result);
});

module.exports = genreRouter;
