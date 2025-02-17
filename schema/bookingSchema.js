import mongoose, { Types } from "mongoose"; 

const bookingSchema = new mongoose.Schema({
    service: {
        type: Types.ObjectId,
        ref: "Service",
        required: true, 
    }, 
    user: { 
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    mentor: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    dateAndTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    meetingLink: {
        type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;