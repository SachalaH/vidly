const { Customer, validateCustomer } = require("../models/customer");
const express = require("express");
const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
  // res.status(200).send(customers);
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

customerRouter.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`The Customer with given ID=${req.params.id} is not found.`);
  res.send(customer);
});

customerRouter.post("/", async (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create Customer

  let newCustomer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  //save new Customer
  newCustomer = await newCustomer.save();
  //send it back to client
  res.send(newCustomer);
});

customerRouter.put("/:id", async (req, res) => {
  // validate the data
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // find the Customer and update
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  //send it back
  res.send(customer);
});

customerRouter.delete("/:id", async (req, res) => {
  const result = await Customer.findByIdAndRemove(req.params.id);
  res.send(result);
});

module.exports = customerRouter;
