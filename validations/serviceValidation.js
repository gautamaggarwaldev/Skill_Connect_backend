import Joi from "joi";

const createServiceValidation = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    duration: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    active: Joi.boolean().required(),
});

const updateServiceValidation = Joi.object({
    name: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    duration: Joi.number().integer().min(1).optional(),
    price: Joi.number().min(0).optional(),
    active: Joi.boolean().optional(),
});

export { createServiceValidation, updateServiceValidation };
