import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import serviceRoute from "./serviceRoute.js";

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
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
