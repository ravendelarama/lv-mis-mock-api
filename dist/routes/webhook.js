"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const VERIFY_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
router.get("/", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("Webhook verified!");
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }
});
router.post("/", (req, res) => {
    const body = req.body;
    if (body.object === "page") {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];
            const senderId = webhookEvent.sender.id; // Parent's PSID
            // Check for referral parameter
            if (webhookEvent.referral && webhookEvent.referral.ref) {
                const studentId = webhookEvent.referral.ref; // Student ID from the referral
                console.log(`Referral received for Student ID: ${studentId} from PSID: ${senderId}`);
                // Save the mapping between student ID and parent PSID
                // saveStudentParentLink(studentId, senderId);
            }
            // Handle other messaging events
            if (webhookEvent.message) {
                const messageText = webhookEvent.message.text;
                sendMessengerNotification(senderId, messageText);
                console.log(`Message received from PSID ${senderId}: ${messageText}`);
            }
        });
        return res.status(200).send("EVENT_RECEIVED");
    }
    else {
        return res.sendStatus(404);
    }
});
async function sendMessengerNotification(parentMessengerId, message) {
    const url = `https://graph.facebook.com/v14.0/me/messages?access_token=${VERIFY_TOKEN}`;
    const payload = {
        recipient: { id: parentMessengerId },
        message: { text: message },
    };
    try {
        await axios_1.default.post(url, payload);
        console.log("Message sent successfully");
    }
    catch (err) {
        console.error("Error sending message:", err.response ? err.response.data : err.message);
    }
}
exports.default = router;
