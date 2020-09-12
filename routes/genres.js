const express = require("express");
const Joi = require("joi");
const router = express.Router();

var genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "comedy" },
];

router.get("/", (req, res) => {
  res.status(200).json(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  } else {
    const newGenre = {
      id: genres.length + 1,
      name: req.body.name,
    };
    genres.push(newGenre);
    res.status(200).json(genres);
    return;
  }
});

router.put("/:genreId", (req, res) => {
  // find the genre with id
  let genre = genres.find((genre) => genre.id === parseInt(req.params.genreId));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with id ${req.params.genreId} not found.`);

  // validate the data received
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // update
  genre.name = req.body.name;
  res.status(200).send(genre);
  return;
});

router.delete("/:genreId", (req, res) => {
  // Find
  const genre = genres.find(
    (genre) => genre.id === parseInt(req.params.genreId)
  );
  if (!genre)
    return res
      .status(404)
      .send(`Genre with id ${req.params.genreId} not found.`);

  // delete
  genres = genres.filter((genre) => genre.id !== parseInt(req.params.genreId));
  res.status(200).send(genres);
  return;
});

// Function to validate genre name
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}
module.exports = router;
