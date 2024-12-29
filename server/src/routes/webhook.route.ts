import express from "express";
import { handleReferralEvent, verifyMetaMessengerWebhook } from "../controllers/index.controller";

const router = express.Router();

router.get("/", verifyMetaMessengerWebhook);

router.post("/", handleReferralEvent);


// async function sendMessengerNotification(
//   parentMessengerId: string,
//   message: string
// ) {
//   const url = `https://graph.facebook.com/v14.0/me/messages?access_token=${VERIFY_TOKEN}`;

//   const payload = {
//     recipient: { id: parentMessengerId },
//     message: { text: message },
//   };

//   try {
//     await axios.post(url, payload);
//     console.log("Message sent successfully");
//   } catch (err: any) {
//     console.error(
//       "Error sending message:",
//       err.response ? err.response.data : err.message
//     );
//   }
// }

export default router;



