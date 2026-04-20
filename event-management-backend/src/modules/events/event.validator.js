const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().min(0).required(),
  totalSeats: Joi.number().min(1).required(),
  date: Joi.date().required(),
  image: Joi.string().optional()
});

const updateEventSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
  location: Joi.string(),
  price: Joi.number().min(0),
  totalSeats: Joi.number().min(1),
  date: Joi.date(),
  image: Joi.string()
});

module.exports = {
  createEventSchema,
  updateEventSchema
};