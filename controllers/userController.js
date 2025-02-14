import { v2 as cloudinary } from "cloudinary";
import config from "../config/index.js";
import { StatusCodes } from "http-status-codes";
import { getUserById, updateUserPhoto, updateUserProfile } from "../services/userService.js";

cloudinary.config(config.cloudinary);
console.log("Cloudinary config:", config.cloudinary);

const uploadPhoto = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "No file uploaded",
        });
    }
    console.log("File path", req.file.path);
    try {
        console.log("Starting Cloudinary upload...");
        console.log("API Key:", config.cloudinary.API_KEY);
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "users_photos",
            use_filename: true,
        });
        console.log("Upload Successful:", result);

        const updatedUser = await updateUserPhoto(req.user._id, result.secure_url);

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Photo uploaded successfully",
            photoUrl: updatedUser.photoUrl,
            success: true,
        });
    } 
    catch (error) {
        // console.error("Error uploading photo", error);
        console.error("Error uploading photo:", error.message);
        console.error("Cloudinary error details:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error uploading photo...",
            error: error.message // Add error message to response for debugging
        });
    }
};

const getUser = async (req, res) => {
    const userId = req.user._id;
    const user = await getUserById(userId);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User not found",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "User fetched successfully",
        user,
    });
};

const updateUserProfileController = async (req, res) => {
    const userId = req.user._id;
    const profileData = req.body;

    const updatedUser = await updateUserProfile(userId, profileData);

    if (!updatedUser) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User not found",
        });
    }

    res.status(StatusCodes.OK).json({
        message: "User profile updated successfully",
        success: true,
        user: updatedUser,
    });

}

export { uploadPhoto, getUser, updateUserProfileController };
