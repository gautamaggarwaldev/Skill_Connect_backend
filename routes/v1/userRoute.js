import express from "express";
import { protect } from "../../middlewares/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getUser } from "../../controllers/userController.js";

const router = express.Router();

router.get("/", protect, asyncHandler(getUser));

export default router;
