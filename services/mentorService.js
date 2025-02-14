import User from "../schema/userSchema.js";
import Service from "../schema/serviceSchema.js";
import mongoose from "mongoose";

const getAllMentors = async() => {
    const mentors = await User.find({
        role: "mentor"
    });
    return mentors;
};

const getMentorById = async(id) => {
    const mentor = await User.findOne({
        _id: id, 
        role: "mentor",
    });
    return mentor;
};

const getMentorByUsername = async(username) => {
    return await User.findOne({ username, role: "mentor" });
};

const getMentorServices = async(id) => {
    if(!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid id.....")
    }
    return await Service.find({ mentor: id, active: true });
};

export { getAllMentors, getMentorByUsername, getMentorServices, getMentorById };