import { StatusCodes } from "http-status-codes";
import { getAllMentors, getMentorById, getMentorByUsername, getMentorServices } from "../services/mentorService.js";
import ApiError from "../utils/apiError.js"

const getMentorInfoByUsername = async(req, res, next) => {
    const { username } = req.params;
    const mentor = await getMentorByUsername(username);

    if(!mentor) {
        return next(new ApiError(StatusCodes.NOT_FOUND, "Mentor not found"));
    }
    const services = await getMentorServices(mentor._id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Mentor fetched successfully",
        mentor,
        services,
    });
};

const getAllMentorsController = async(req, res) => {
    const mentors = await getAllMentors();

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched All Mentors Successfully",
        mentors,
    });
};


const getMentorByIdController = async(req, res) => {
    const mentorId = req.params.mentorId;
    const mentor = await getMentorById(mentorId);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Mentor fetched successfully",
        mentor,
    });
};

export { getMentorInfoByUsername, getAllMentorsController, getMentorByIdController };