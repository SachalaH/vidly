const { User, validateUser } = require("../models/user");
const express = require("express");
const userRouter = express.Router();
const _ = require("lodash");

userRouter.get("/", async (req, res) => {
  // res.status(200).send(users);
  const users = await User.find().sort("name");
  res.send(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send(`The User with given ID=${req.params.id} is not found.`);
  res.send(user);
});

userRouter.post("/", async (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create User

  let newUser = new User(_.pick(req.body, ["name", "email", "password"]));
  //save new User
  newUser = await newUser.save();
  //send it back to client
  res.send(_.pick(newUser, ["_id", "name", "email"]));
});

module.exports = userRouter;
