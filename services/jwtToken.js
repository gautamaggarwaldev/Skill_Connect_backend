import jwt from "jsonwebtoken";
import config from "../config/index.js";
import moment from "moment"; 
// moment is a JavaScript library that significantly simplifies date and time manipulation by providing
//  an intuitive API for parsing, validating, formatting, and calculating time differences.

const generateToken = (userId, username, email, expires, secret) => {
    const payload = {
        _id: userId,
        iat: moment().unix(), // iat -> issued at time
        exp: expires.unix(), // unix time is the number of seconds since January 1, 1970
        username: username,
        email: email,
    };
    return jwt.sign(payload, secret);
};

const generateAuthTokens = async(user) => {
    const accessTokenExpires = moment().add(config.jwt.ACCESS_EXPIRATION_MINUTES, "minutes");
    const accessToken = generateToken(user._id, user.username, user.email, accessTokenExpires, config.jwt.ACCESS_SECRET);

    return accessToken;
};

const generateVerificationToken = async(userId) => {
    const verificationTokenExpires = moment().add(config.jwt.VERIFICATION_EXPIRATION_MINUTES, "minutes");
    const verificationToken = generateToken(userId, verificationTokenExpires, config.jwt.VERIFICATION_SECRET);

    return verificationToken;
};

const verifyToken = async(token, secret) => {
    if(secret === "accessToken") {
        return await jwt.verify(token, config.jwt.ACCESS_SECRET);
    } else if(secret === "verify") {
        return await jwt.verify(token, config.jwt.VERIFICATION_SECRET); // ** verifyToken is used to verify the token
    }
}

export { generateAuthTokens, generateVerificationToken, verifyToken };
