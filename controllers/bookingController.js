import Razorpay from "razorpay";
import config from "../config/index.js";
import { getServiceById } from "../services/servicesService.js";
import { createBooking, getBookingById, getMentorBooking, getUserBooking, updateBookingById } from "../services/bookingService.js";
import { StatusCodes } from "http-status-codes";
 
const initiateBookingAndPayment = async(req, res) => {
    const { dateAndTime, serviceId } = req.body;
    const service = await getServiceById(serviceId);

    //create a new booking
    const newBooking = await createBooking({
        user: req.user._id,
        mentor: service.mentor,
        dateAndTime,
        service: serviceId,
        price: service.price,
    });

    //Initialize razorpay instance
    const razorpay = new Razorpay(config.razorpay);

    //Create an order in Razorpay
    const options = {
        amount: service.price,
        currency: "INR",
        receipt: `receipt_order_${newBooking._id}`,
        notes: {
            bokkingId: newBooking._id,
        },
    };

    const order = await razorpay.orders.create(options);

    // Send response with booking and payment details
    res.status(StatusCodes.CREATED).json({
        booking: newBooking,
        order,
    });
};

const getBookingByIdController = async(req, res, next) => {
    const booking = await getBookingById(req.params.id);
    res.status(StatusCodes.OK).json({
        booking,
    });
};

const updateBookingByIdController = async(req, res, next) => {
    const booking = await updateBookingById(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Booking updated successfully",
        booking,
    });
};

const getBookings = async(req, res) => {
    const bookings = await getUserBooking(req.user._id);
    console.log(bookings);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched booking successfully...",
        booking: bookings,
    });
};

const getMentorBookings = async(req, res) => {
    const bookings = await getMentorBooking(req.user._id);
    console.log(bookings);
    res.status(StatusCodes.OK).json({
        success: true,
        message : "Bookings fetched successfully...",
        booking: bookings,
    });
};

export { initiateBookingAndPayment, getBookings, getMentorBookings, getBookingByIdController, updateBookingByIdController };
