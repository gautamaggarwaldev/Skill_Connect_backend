import { StatusCodes } from "http-status-codes";
import { createAvailability, getAvailability, getMentorAvailabilityForNext14Days } from "../services/availabilityService.js";
import ApiError from "../utils/apiError.js";

const createAvailabilityController = async (req, res) => {
    const userId = req.user._id;
    const availabilityData = req.body;

    const existingAvailability = await getAvailability(userId);

    if (existingAvailability) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Availability already exists");
    }

    const availability = await createAvailability(userId, availabilityData);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Availability created successfully",
        availability,
    });
};

const getAvailabilityController = async (req, res) => {
    const userId = req.user._id;
    const availability = await getAvailability(userId);

    if (!availability) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Availability not found");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched availability successfully",
        availability,
    });
};

const getNext14DaysAvailability = async (req, res) => {
    const mentorId = req.params.mentorId;
    const durationInMinutes = req.query.durationInMinutes || 30;
    //req.query is an object in Express.js that contains the query parameters from the URL of an incoming request. It's commonly used to retrieve values passed in the URL after the ? symbol.
    // eg -> http://localhost:3000/search?name=John&age=25

    const availability = await getMentorAvailabilityForNext14Days(mentorId, durationInMinutes);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Make availability successfully...",
        availability,
    });
};

export { createAvailabilityController, getAvailabilityController, getNext14DaysAvailability };