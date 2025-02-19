import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Hello from Server",
    });
});

export default router;
