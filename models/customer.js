const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    maxlength: 11,
    required: true,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean().default(false),
    phone: Joi.string().max(11).required(),
  });

  return customerSchema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
