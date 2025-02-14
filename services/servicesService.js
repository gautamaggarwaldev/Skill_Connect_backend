import Service from "../schema/serviceSchema.js"

const createService = async (serviceData) => {
    const service = await Service.create(serviceData);
    return service;
};

const updateService = async (serviceId, mentorId, updateData) => {
    const service = await Service.findOneAndUpdate({
        _id: serviceId,
        mentor: mentorId,
    }, updateData, {
        new: true, // { new: true } → Returns the updated document instead of the old one.
        runValidators: true, // { runValidators: true } → Ensures that the update follows the validation rules defined in the Mongoose schema.
    });
    return service;
};
 
const getServiceByMentor = async(mentorId) => {
    const service = await Service.find({ mentor: mentorId });
    return service;
};

const getServiceById = async(serviceId) => {
    const service = await Service.findById(serviceId);
    return service;
};

export { createService, getServiceById, getServiceByMentor, updateService };