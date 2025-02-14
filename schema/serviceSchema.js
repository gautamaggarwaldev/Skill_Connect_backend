import mongoose, { Types } from "mongoose";

const serviceSchema = new mongoose.Schema({
    mentor: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true, 
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);

export default Service; 