import { StatusCodes } from "http-status-codes";
import { createUser as userService, loginWithEmailAndPassword } from "../services/authService.js"
import { generateAuthTokens } from "../services/jwtToken.js"

const signUp = async(req, res) => {
    const {name, email, password , username, role, profile} = req.body;
    const user = await userService({
        name, 
        email,
        password,
        username,
        role,
        profile,
    });

    user.password = undefined;

    console.log(user);

    return res.status(StatusCodes.CREATED).json({
        message:"Account created successfully",
        user,
    });

};

const signIn = async(req, res) => {
    const {email, password} = req.body;

    const user = await loginWithEmailAndPassword(email, password);

    const token = await generateAuthTokens(user);
    //remove password from user
    user.password = undefined;

    console.log(token);

    res.status(StatusCodes.OK).json({
        message: "Logged in successfully",
        token,
        user,
    });
};

export { signUp, signIn };