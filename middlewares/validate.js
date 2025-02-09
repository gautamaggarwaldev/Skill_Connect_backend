import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/apiError.js";

const validationSource = { 
    BODY: "body",
    HEADER: "headers",
    QUERY: "query",
    PARAM: "params",
};
const validate = (schema, source = validationSource.BODY) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req[source]);

            if(!error) return next();

            const { details } = error;
            const message = details.map((i) => i.message.replace(/['"]/g, "")).join(", ");
            console.error(message);
            next(new ApiError(StatusCodes.BAD_REQUEST, message));
        }
        catch(error) {
            next(error);
        }
    };
};

export default validate;