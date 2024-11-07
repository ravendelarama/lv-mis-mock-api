import express from "express";
import passport from '../config/passport-config'
import { handleGoogleCallback } from "../controllers";

const router = express.Router();
const redirectUri = process.env.NODE_ENV !== 'production' ? process.env.CLIENT_DEV_URL : process.env.CLIENT_PROD_URL

router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

router.get("/google/callback", passport.authenticate('google', { session: false, failureRedirect: redirectUri }), handleGoogleCallback);


export default router;



