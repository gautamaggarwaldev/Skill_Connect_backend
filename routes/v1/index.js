import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import serviceRoute from "./serviceRoute.js";
import mentorRoute from "./mentorRoute.js";
import bookingRoute from "./bookingRoute.js";
import availabilityRoute from "./availabilityRoute.js";
import webhookRoute from "./webhookRoute.js";
import homeRoute from "./homeRoute.js";

const router = express.Router();

const Routes = [
    {
        path: "/auth",
        route: authRoute,
    }, 
    {
        path: "/users",
        route: userRoute,
    },
    {
        path: "/services",
        route: serviceRoute,
    },
    {
        path: "/mentors",
        route: mentorRoute,
    },
    {
        path: "/bookings",
        route: bookingRoute,
    },
    {
        path: "/availability",
        route: availabilityRoute,
    },
    {
        path: "/webhook",
        route: webhookRoute,
    },
    {
        path: "/home",
        route: homeRoute,
    }
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
