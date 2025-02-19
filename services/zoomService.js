import axios from 'axios';
import config from '../config/index.js';

async function getZoomAuthToken() {
    const auth = Buffer.from(`${config.zoom.clientId}:${config.zoom.clientSecret}`).toString("base64");

    try {
        const res = await axios.post(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${config.zoom.accountId}`, {}, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        return res.data.access_token;
    }
    catch (error) {
        console.error(error.res ? error.res.data : error.message);
    }
}

const createScheduledZoomMeeting = async (startTime, duration) => {
    try {
        const accessToken = await getZoomAuthToken();
        const res = await axios.post(`https://api.zoom.us/v2/users/me/meetings`, {
            topic: "Scheduled Meeting",
            type: 2,
            start_time: startTime,
            duration: duration,
            timezone: "Asia/Kolkata",
            agenda: "This is a scheduled meeting",
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                enforce_login: false,
            },
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        return res.data.join_url;
    }
    catch(error) {
        console.error("Error creating Zoom meeting:", error.res ? error.res.data : error.message);
    }
};


export default createScheduledZoomMeeting;