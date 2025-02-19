import moment from "moment";
import { StatusCodes } from "http-status-codes";
import Availability from "../schema/availabilitySchema.js";
import Booking from "../schema/bookingSchema.js"
import ApiError from "../utils/apiError.js";

const createAvailability = async(userId, availabilityData) => {
    const availability = await Availability.create({
        userId,
        ...availabilityData,
    });
    return availability;
};

const updateAvailability = async(userId, availabilityData) => {
    try {
        const availability = await Availability.findOneAndUpdate(
            { userId },
            availabilityData,
            { new: true, runValidators: true }
        );
        if(!availability) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Availability not found");
        }
        return availability;
    }
    catch(error) {
        console.log(error);
        throw new ApiError(StatusCodes.BAD_REQUEST, "Error updating availability");
    }
};

const getAvailability = async(userId) => {
    const availability = await Availability.findOne({
        userId
    });
    return availability;
};

const getMentorAvailabilityForNext14Days = async(userId, durationInMinutes) => {
    
    //1. Fetch Mentor Availability
    //2. Handle Error If No Availability Is Found
    //3. Extract Mentor’s Weekly Availability & Unavailable Dates
    //4. Function to Generate Time Slots
    //5. Fetch Booked Appointments
    //6. Generate Availability for the Next 14 Days
    //7. Skip Unavailable Dates
    //8. Retrieve Availability for Each Day
    //9. Generate Time Slots & Remove Booked Ones
    //10. Add the Available Slots to the Final Response
    //11. Return the Final Availability or Handle Errors

    try {
        //Fetch mentor availabilty by userId
        const mentorAvailability = await Availability.findOne({
            userId
        });

        if(!mentorAvailability) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Mentor availability not found");
        }

        const { weeklyAvailability, unavailableDates } = mentorAvailability;
        const unavailableDateSet = new Set (
            unavailableDates.map((date) => moment(date).format("YYYY-MM-DD"))
        );

        //Function to break down time slots into smaller durations with full date-time
        const getSlots = (currentDate, startTime, endTime, duration) => {
            const start = moment(`${currentDate}T${startTime}`);
            const end = moment(`${currentDate}T${endTime}`);
            const slots = [];

            while(start < end) {
                const slotEnd = moment(start).add(duration, "minutes");
                if(slotEnd > end) break;
                slots.push({
                    startTime: start.format("HH:mm"),
                    endTime: slotEnd.format("HH:mm"),
                    fullStart: start.toISOString(),
                    fullEnd: slotEnd.toISOString(),
                });
                start.add(duration, "minutes");
            }
            return slots;
        };

        //Get all bookings for the next 14 days for the mentor
        const bookings = await Booking.find({
            mentor: userId,
            dateAndTime: {
                $gte: moment().startOf("day").toDate(),
                $lte: moment().add(14, "days").endOf("day").toDate(),
            },
        });

        const bookedSlots = new Set (
            bookings.map((booking) => moment(booking.dateAndTime).toISOString())
        );

        //Generate availability for the next 14 days
        const next14DaysAvailability = [];
        for (let i=0; i<14; i++) {
            const currentDate = moment().add(i, "days").format("YYYY-MM-DD");
            const dayOfWeek = moment(currentDate).format("dddd").toLowerCase();

            //Skip if the date is marked as unavailable
            if(unavailableDateSet.has(currentDate)) {
                continue;
            }

            //Get the mentor's availability for that day of the week
            const dailyAvailability = weeklyAvailability[dayOfWeek] || [];
            const slotsForDay = [];

            dailyAvailability.forEach((slot) => {
                const slots = getSlots(
                    currentDate,
                    slot.startTime,
                    slot.endTime,
                    durationInMinutes
                );

                // Exclude slots that are already booked
                const availableSlots = slots.filter((slot) => !bookedSlots.has(slot.fullStart));
                slotsForDay.push(...availableSlots);
            });

            if(slotsForDay.length > 0) {
                next14DaysAvailability.push({
                    date: currentDate,
                    slots: slotsForDay,
                });
            }
        }
        return next14DaysAvailability;
    }
    catch(error) {
        console.error("Error fetching mentor availability", error);
        return {
            error: "Error retrieving mentor availability."
        };
    }
};

export { createAvailability, updateAvailability, getAvailability, getMentorAvailabilityForNext14Days };