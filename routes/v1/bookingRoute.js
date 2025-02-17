import express from 'express';
import validate from '../../middlewares/validate.js';
import { protect, restrictTo } from '../../middlewares/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { initiateBookingValidation, updateBookingValidation } from '../../validations/bookingValidation.js';
import { getBookingByIdController, getBookings, getMentorBookings, initiateBookingAndPayment, updateBookingByIdController } from '../../controllers/bookingController.js';


const router = express.Router();

router.post("/initiate-booking", validate(initiateBookingValidation), protect, asyncHandler(initiateBookingAndPayment));

router.get("/", protect, asyncHandler(getBookings));

router.get("/mentor", protect, restrictTo("mentor"), asyncHandler(getMentorBookings));

router.get("/get-booking/:id", protect, asyncHandler(getBookingByIdController));

router.put("/update-booking/:id",validate(updateBookingValidation) ,protect, restrictTo("mentor"), asyncHandler(updateBookingByIdController));


export default router; 