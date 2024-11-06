import axios from "axios";
import { Body, Entry } from "../types/types";
import express, { Request } from "express";

const router = express.Router();
const VERIFY_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post("/", (req: Request<{}, {}, Body>, res: any) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry: Entry) => {
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
  } else {
    return res.sendStatus(404);
  }
});


async function sendMessengerNotification(
  parentMessengerId: string,
  message: string
) {
  const url = `https://graph.facebook.com/v14.0/me/messages?access_token=${VERIFY_TOKEN}`;

  const payload = {
    recipient: { id: parentMessengerId },
    message: { text: message },
  };

  try {
    await axios.post(url, payload);
    console.log("Message sent successfully");
  } catch (err: any) {
    console.error(
      "Error sending message:",
      err.response ? err.response.data : err.message
    );
  }
}

export default router;



