import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import handleRazorpayWebhook from "../../controllers/webhookController.js";

const router = express.Router();

router.post("/razorpay", asyncHandler(handleRazorpayWebhook));

export default router;