import express from "express";
import authRoute from "./authRoute.js";

const router = express.Router();

const Routes = [
    {
        path: "/auth",
        route: authRoute,
    }
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
