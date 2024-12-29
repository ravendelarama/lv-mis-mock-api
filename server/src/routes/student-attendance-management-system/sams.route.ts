import express from "express";
import { handleSamsAuthentication } from "../../controllers/index.controller";

const router = express.Router();

router.post("/sams-redirect", handleSamsAuthentication);

export default router;
