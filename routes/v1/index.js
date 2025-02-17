import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import serviceRoute from "./serviceRoute.js";
import mentorRoute from "./mentorRoute.js";
import bookingRoute from "./bookingRoute.js";

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
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
