import { Body, Entry } from "../types/types";
import express, { Request } from "express";

const router = express.Router();
const VERIFY_TOKEN = process.env.FB_MESSENGER_VERIFY_TOKEN;

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
  console.log("Received POST request at /webhook");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Request body:", JSON.stringify(req.body, null, 2)); // Log the entire body for debugging

  const body = req.body;

  // Check if the event is from a page subscription
  if (body.object === "page") {
    body.entry.forEach((entry: Entry) => {
      const webhookEvent = entry.messaging[0];
      console.log("Webhook event:", JSON.stringify(webhookEvent, null, 2));

      // Handle the message event
      // const senderId = webhookEvent.sender.id; // PSID
      // const messageText = webhookEvent.message.text; // The message text
    });

    return res.status(200).send("EVENT_RECEIVED");
  } else {
    return res.sendStatus(404);
  }
});

export default router