import cloudinary from "cloudinary";
import config from "../config/index.js";
import { StatusCodes } from "http-status-codes";
import { getUserById, updateUserPhoto, updateUserProfile } from "../services/userService.js";

cloudinary.config(config.cloudinary);

const uploadPhoto = async(req, res) => {
    if(!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "No file uploaded",
        });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "users_photos",
            use_filename: true,
        });

        const updateUser = await updateUserPhoto(req.user._id, result.secure_url);

        if(!updateUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Photo uploaded successfully",
            photoUrl: updateUser.photoUrl,
        });
    }
    catch(error) {
        console.error("Error uploading photo", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error uploading photo",
        });
    }
};

const getUser = async(req, res) => {
    const userId = req.user._id;
    const user = await getUserById(userId);

    if(!user) {
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

const updateUserProfileController = async(req, res) => {
    const userId = req.user._id;
    const profileData = req.body;

    const updatedUser = await updateUserProfile(userId, profileData);

    if(!updatedUser) {
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
