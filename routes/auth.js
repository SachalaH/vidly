const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const authRouter = express.Router();
const Joi = require("joi");

authRouter.post("/", async (req, res) => {
  // validate the data sent
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // find the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");
  // if found then check the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  // if password is correct send a response
  res.status(200).json({ auth: true });
});

function validateReq(req) {
  const loginSchema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return loginSchema.validate(req);
}

module.exports = authRouter;
