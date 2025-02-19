import mongoose, { Types } from "mongoose";

const availabilitySchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    weeklyAvailability: {
        monday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        tuesday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        wednesday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        thrusday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        friday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        saturday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
        sunday: [
            {
                startTime: {
                    type: String
                },
                endTime: {
                    type: String
                }
            },
        ],
    },
    unavailableDates: [
        {
            type: Date,
        },
    ],
}, {
    timestamps: true
});

const Availability = mongoose.model("Availability", availabilitySchema);

export default Availability;