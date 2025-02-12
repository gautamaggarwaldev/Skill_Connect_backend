import ApiError from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";
import { getUserById } from "../services/userService.js";
import { verifyToken } from "../services/jwtToken.js";

const protect = async(req, res, next) => {
    //get token and check if it is exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, "You are not logged in! Please log in to get access."));
    }

    try {
        //verify token
        const decoded = await verifyToken(token, "accessToken");

        //check if user still exists
        const currentUser = await getUserById(decoded._id);
        if(!currentUser) {
            return next(new ApiError(StatusCodes.UNAUTHORIZED), "The user belonging to this token no longer exists.");
        }

        //grant access to protected route
        req.user = currentUser;
        next();
    }
    catch(error) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token. Please log in again."));
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to access this route."));
        }
        next();
    }
};

export { protect, restrictTo };
