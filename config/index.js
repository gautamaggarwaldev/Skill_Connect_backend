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
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
}

export default config;



