import Joi from "joi";

const updateUserProfileValidation = Joi.object({
    tags: Joi.string().optional(),
    title: Joi.string().optional(),
    bio: Joi.string().optional(),
    socialLinks: Joi.object({
        linkedin: Joi.string().optional(),
        github: Joi.string().optional(),
        twitter: Joi.string().optional(),
        facebook: Joi.string().optional(),
        instagram: Joi.string().optional(),
    }).optional(),
    college: Joi.string().optional(),
});

export { updateUserProfileValidation };