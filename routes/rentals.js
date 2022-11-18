const { Rental, validateRental } = require("../models/rental");
const express = require("express");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const rentalRouter = express.Router();
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init("mongodb://localhost/vidly");

rentalRouter.get("/", async (req, res) => {
  // res.status(200).send(Rentals);
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

rentalRouter.post("/", async (req, res) => {
  //check data : the results has an error property hence destructure it
  // if data is not proper then send bad request
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Fetch the customer from the ID
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer.");
  // Fectch the movie from the ID
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie.");
  //create Rental
  let newRental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  //save new Rental using fawn
  // pass the collection name first and then the new rental created
  // Decrement the available stock by 1
  //   try {
  //     new Fawn.Task()
  //       .save("rentals", newRental)
  //       .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
  //       .run();
  //     //send it back to client
  //     res.send(newRental);
  //   } catch (error) {
  //     res.status(500).send("Something failed..");
  //   }
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const result = await newRental.save();
      movie.numberInStock--;
      movie.save();
      res.send(result);
    });
    session.endSession();
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
});

module.exports = rentalRouter;
