import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { getAllMentorsController, getMentorByIdController, getMentorInfoByUsername } from "../../controllers/mentorController.js";

const router = express.Router();

router.get("/:mentorId", asyncHandler(getMentorByIdController));
router.get("/", asyncHandler(getAllMentorsController));
router.get("/username/:username", asyncHandler(getMentorInfoByUsername));

export default router;