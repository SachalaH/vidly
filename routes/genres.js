const Joi = require("joi");
const express = require("express");
const genreRouter = express.Router();

genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "comedy" },
  { id: 3, name: "action" },
];

genreRouter.get("/", (req, res) => {
  res.status(200).send(genres);
});

genreRouter.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID=${req.params.id} is not found.`);
  res.send(genre);
});

genreRouter.post("/", (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create genre
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  //push genre
  genres.push(newGenre);
  res.send(newGenre);
});

genreRouter.put("/:id", (req, res) => {
  // find the genre send error if not found
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID=${req.params.id} is not found.`);
  // validate the data
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //update the data
  genre.name = req.body.name;
  //send it back
  res.send(genre);
});

genreRouter.delete("/:id", (req, res) => {
  //find the genre if not then send not found error
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`The genre with given ID=${req.params.id} is not found.`);
  // delete the data if found
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // return the data
  res.send(genre);
});

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return genreSchema.validate(genre);
}

module.exports = genreRouter;
