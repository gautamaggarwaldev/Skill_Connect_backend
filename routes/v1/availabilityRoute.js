import express from "express";
import { protect, restrictTo } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import createAvailabilityValidation from "../../validations/availabilityValidation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAvailabilityController, getAvailabilityController, getNext14DaysAvailability } from "../../controllers/availabilityController.js";

const router = express.Router();

router.post("/", protect, restrictTo("mentor"), validate(createAvailabilityValidation), asyncHandler(createAvailabilityController));

router.get("/", protect, restrictTo("mentor"), asyncHandler(getAvailabilityController));

router.get("/mentor-availability/:mentorId", protect, asyncHandler(getNext14DaysAvailability));

export default router;