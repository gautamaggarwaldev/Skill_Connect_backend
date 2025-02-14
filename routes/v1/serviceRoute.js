import express from "express";
import validate from "../../middlewares/validate.js";
import { protect, restrictTo } from "../../middlewares/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createServiceValidation, updateServiceValidation } from "../../validations/serviceValidation.js";
import { createServiceController, getServiceByIdController, getServiceByMentorController, updateServiceController } from "../../controllers/serviceController.js";

const router = express.Router();

router.post("/", validate(createServiceValidation), protect, restrictTo("mentor"), asyncHandler(createServiceController));

router.get("/mentorid", protect, restrictTo("mentor"), asyncHandler(getServiceByMentorController));

router.get("/:serviceId", protect, asyncHandler(getServiceByIdController));

router.put("/:serviceId", validate(updateServiceValidation), protect, restrictTo("mentor"), asyncHandler(updateServiceController));

export default router;