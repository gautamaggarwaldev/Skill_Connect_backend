import Joi from "joi";
const initiateBookingValidation = Joi.object({
    serviceId: Joi.string().required(),
    dateAndTime: Joi.string().required(),
});

const updateBookingValidation = Joi.object({
    status: Joi.string().required(),
    dateAndTime: Joi.string().optional(),
});

export { initiateBookingValidation, updateBookingValidation };