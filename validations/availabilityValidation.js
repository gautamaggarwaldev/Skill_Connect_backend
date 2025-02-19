import Joi from "joi";

const timeSlotSchema = Joi.object({
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
});

const weeklyAvailabilitySchemaValidation = Joi.object({
    monday: Joi.array().items(timeSlotSchema).optional(),
    tuesday: Joi.array().items(timeSlotSchema).optional(),
    wednesday: Joi.array().items(timeSlotSchema).optional(),
    thrusday: Joi.array().items(timeSlotSchema).optional(),
    friday: Joi.array().items(timeSlotSchema).optional(),
    saturday: Joi.array().items(timeSlotSchema).optional(),
    sunday: Joi.array().items(timeSlotSchema).optional(),
});

const createAvailabilityValidation = Joi.object({
    weeklyAvailability: weeklyAvailabilitySchemaValidation.required(),
    unavailableDates: Joi.array().items(Joi.date()).optional(),
});

export default createAvailabilityValidation;