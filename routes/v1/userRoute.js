import express from "express";
import { protect } from "../../middlewares/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getUser, updateUserProfileController, uploadPhoto } from "../../controllers/userController.js";
import { upload } from "../../middlewares/upload.js";
import { updateUserProfileValidation } from "../../validations/userValidation.js";
import validate  from "../../middlewares/validate.js";

const router = express.Router(); 

router.get("/", protect, asyncHandler(getUser));
router.post("/uploadphoto", protect, upload.single("avtar"), asyncHandler(uploadPhoto));
router.put("/updateprofile", protect, validate(updateUserProfileValidation) ,asyncHandler(updateUserProfileController));

export default router;
