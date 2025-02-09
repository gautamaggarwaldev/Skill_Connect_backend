import { StatusCodes } from "http-status-codes";
import User from "../schema/userSchema.js"

const createUser = async(data) => {
    const user = await User.create(data);
    return user;
}

const loginWithEmailAndPassword = async(email, password) => {
    const user = await User.findOne({ email }).select("+password");
    //.select("+password"): Explicitly includes the password field in the result,
    //  even if it's set as excluded by default in the schema.
    if(!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }
    return user;
}

export { createUser, loginWithEmailAndPassword };