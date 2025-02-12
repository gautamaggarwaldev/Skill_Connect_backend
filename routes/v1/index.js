import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";

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
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
