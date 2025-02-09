import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/apiError.js";

const validationSource = {
    BODY: "body",
    HEADER: "headers",
    QUERY: "query",
    PARAM: "params",
};
// validate(joiSchema, validationSource.BODY)

const validate = (schema, source = validationSource.BODY) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req[source]);
            //It extracts the part of the request to be validated (req[source]) and validates 
            // it against the given Joi schema.

            if (!error) return next();

            const { details } = error;
            const message = details.map((i) => i.message.replace(/['"]/g, "")).join(", ");
            console.error(message);
            next(new ApiError(StatusCodes.BAD_REQUEST, message));
        }
        catch (error) {
            next(error);
        }
    };
};

export default validate;