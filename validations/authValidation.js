//ensuring that data conforms to a specific structure or set of rules is crucial for 
// maintaining data integrity and application reliability.
import Joi from "joi";

const signUpValidation = Joi.object().keys({ 
    name: Joi.string().required().trim(),
    username: Joi.string().required().trim(),
    email: Joi.string().required().trim().email(), 
    password: Joi.string().required().trim().min(8),
    role: Joi.string().valid("mentor", "student").required(),
    profile: Joi.object({
        title: Joi.string().optional(),
        college: Joi.string().optional(),
        bio: Joi.string().optional(),
        socialLinks: Joi.object({
            linkedin: Joi.string().optional(),
            github: Joi.string().optional(),
            twitter: Joi.string().optional(),
            facebook: Joi.string().optional(),
        }).optional(),
    }).optional(),
});


const signInValidation = Joi.object().keys({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required(),
});

export { signUpValidation, signInValidation };
