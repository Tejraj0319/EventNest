const Joi = require("joi");

const createBookingSchema  = Joi.object({
    eventId: Joi.number().required(),
    quantity: Joi.number().min(1).required()
})

module.exports = {
  createBookingSchema
};