import { StatusCodes } from "http-status-codes";
import { getBookingById, updateBookingById } from "../services/bookingService.js";
import sendConfirmationMail from "../services/emailService.js";
import createScheduledZoomMeeting from "../services/zoomService.js";
import moment from "moment";

const handleRazorpayWebhook = async (req, res) => {
    const { event } = req.body;
    if (event === "order.paid") {
        const bookingId = req.body.payload.payment.entity.notes.bookingId;
        const booking = await getBookingById(bookingId);
        const zoomMeeting = await createScheduledZoomMeeting(booking.dateAndTime, booking.service.duration);
        await updateBookingById(bookingId, {
            meetingLink: zoomMeeting,
            status: "confirmed",
        });

        await sendConfirmationMail(
            booking.user.email,
            booking.user.name,
            zoomMeeting,
            moment(booking.dateAndTime).format("DD-MM-YYYY"),
            moment(booking.dateAndTime).format("HH:mm"),
        );
    }
    return res.status(StatusCodes.OK).json({
        message: "Webhook received",
    });
};

export default handleRazorpayWebhook;