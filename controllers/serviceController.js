import { StatusCodes } from "http-status-codes";
import { createService, getServiceById, getServiceByMentor, updateService } from "../services/servicesService.js";
import ApiError from "../utils/apiError.js";

const createServiceController = async(req, res) => {
    const mentorId = req.user._id;
    const { name, description, duration, price } = req.body;

    const service = await createService({
        mentor: mentorId,
        name,
        description,
        duration,
        price,
    });

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Service created successfully",
        service,
    });
};

const updateServiceController = async(req, res) => {
    const serviceId = req.params.serviceId;
    const mentorId = req.user._id;
    const { name, description, duration, price, active } = req.body;

    const updatedService = await updateService(
        serviceId,
        mentorId,
        {
            name,
            description,
            duration,
            price,
            active,
        }
    );

    if(!updatedService) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found or you don't have permission to update it");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Service update successfully",
        service: updatedService,
    });
};

const getServiceByMentorController = async(req, res) => {
    const mentorId = req.user._id;
    const service = await getServiceByMentor(mentorId);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Service fetched successfully",
        service,
    });
};

const getServiceByIdController = async(req, res) => {
    const serviceId = req.params.serviceId;
    const service = await getServiceById(serviceId);


    res.status(StatusCodes.OK).json({
        success: true,
        message: "Service fetched Successfully",
        service,
    });
};


export { createServiceController, getServiceByIdController, getServiceByMentorController, updateServiceController };