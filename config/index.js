import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    jwt: {
        ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "random-secret",
        ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        VERIFICATION_SECRET: process.env.JWT_VERIFICATION_SECRET || "random-secret",
        VERIFICATION_EXPIRATION_MINUTES: process.env.JWT_VERIFICATION_EXPIRATION_MINUTES || 5,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    razorpay: {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    },
}

export default config;



