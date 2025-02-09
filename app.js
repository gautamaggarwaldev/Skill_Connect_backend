import express from "express";
import "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import routes from "./routes/v1/index.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use("/v1", routes);


export default app;



