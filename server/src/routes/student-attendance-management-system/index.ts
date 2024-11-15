import express from "express";
import { handleSamsAuthentication } from "../../controllers";

const router = express.Router();

router.post("/sams-redirect", handleSamsAuthentication);

export default router;
