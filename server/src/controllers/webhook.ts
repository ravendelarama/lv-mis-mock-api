import expressAsyncHandler from "express-async-handler";
import { Body, Entry } from "../types/types";
import { Request } from "express";
const VERIFY_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export const verifyMetaMessengerWebhook = expressAsyncHandler(
  async (req, res) => {
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
  }
);

export const handleReferralEvent = expressAsyncHandler(
  async (req: Request<{}, {}, Body>, res: any) => {

    // https://m.me/process.env.FACEBOOK_PAGE_ID?ref=<JWT_with_studentId_payload>
    const body = req.body;

    if (body.object === "page") {
      body.entry.forEach((entry: Entry) => {
        const webhookEvent = entry.messaging[0];
        const senderId = webhookEvent.sender.id; 

        if (webhookEvent.referral && webhookEvent.referral.ref) {
          const studentId = webhookEvent.referral.ref;
          console.log(
            `Referral received for Student ID: ${studentId} from PSID: ${senderId}`
          );

          // Save the mapping between student ID and parent PSID
          // saveStudentParentLink(studentId, senderId);
        }

        // Handle other messaging events
        if (webhookEvent.message) {
          const messageText = webhookEvent.message.text;
          console.log(`Message received from PSID ${senderId}: ${messageText}`);
        }
        console.log(entry);
      });
      return res.status(200).send("EVENT_RECEIVED");
    } else {
      return res.sendStatus(404);
    }
  }
);
