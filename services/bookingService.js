import Booking from "../schema/bookingSchema.js"

const createBooking = async(bookingData) => {
    const booking = await Booking.create(bookingData);
    return booking;
};
 
const getBookingById = async(bookingId) => {
    const booking = await Booking.findById(bookingId).populate("service").populate("user");
    return booking;
};

const updateBookingById = async(bookingId, bookingData) => {
    const booking = Booking.findByIdAndUpdate(bookingId, bookingData, { new: true });
    return booking;
};

const getUserBooking = async(userId) => {
    const booking = await Booking.find({
        user: userId,  
    });
    return booking;
};

const getMentorBooking = async(mentorId) => {
    const booking = await Booking.find({
        mentor: mentorId,
    });
    return booking;
};

export { createBooking, getBookingById, getUserBooking, getMentorBooking, updateBookingById };