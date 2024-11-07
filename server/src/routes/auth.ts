import express from "express";
import passport from '../config/passport-config'
import { handleGoogleCallback } from "../controllers";
import { logout } from "../controllers/auth";

const router = express.Router();
const redirectUri = process.env.NODE_ENV !== 'production' ? process.env.DEV_CLIENT_URL : process.env.PROD_CLIENT_URL

router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

router.get("/google/callback", passport.authenticate('google', { session: false, failureRedirect: redirectUri }), handleGoogleCallback);

router.post('/logout', logout)


export default router;



