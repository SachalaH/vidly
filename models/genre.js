const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = new mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return genreSchema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
module.exports.genreSchema = genreSchema;
