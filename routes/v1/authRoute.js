import express from "express";
import validate from "../../middlewares/validate.js";
import { signUpValidation, signInValidation } from "../../validations/authValidation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { signUp,signIn } from "../../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(signUpValidation), asyncHandler(signUp));
router.post("/signin", validate(signInValidation), asyncHandler(signIn));



export default router;
