import path from "path";
import ejs from "ejs";
import config from "../config/index.js";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport(config.email);
transport.verify().then(() => console.log("Connected to email server")).catch(() => {
    console.error("Unable to connect to email server.");
});

const sendEmail = async(toString, subject, html) => {
    try {
        const msg = { from: config.email.from, to, subject, html };
        await transport.sendMail(msg);
    }
    catch(error) {
        console.error("Error sending email:", error);
    }
};

const sendConfirmationMail = async (to, name, meetingLink, date, time) => {
    const subject = "Booking Confirmation";
    const template = path.join(__dirname, "../emailtemplate/confirmationEmail.ejs");
    const data = await ejs.renderFile(template, {
        name,
        meetingLink,
        date,
        time,
    });

    return sendEmail(to, subject, data);
};

export default sendConfirmationMail;