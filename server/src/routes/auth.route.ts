import express from "express";
import passport from '../config/passport-config'
import { handleGoogleCallback } from "../controllers/index.controller";
import { logout, validateOAuthToken } from "../controllers/auth.controller";
import environment from "../constants/environment";

const router = express.Router();
const redirectUri = environment.clientUrl

router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

router.get("/google/callback", passport.authenticate('google', { session: false, failureRedirect: redirectUri }), handleGoogleCallback);

router.post('/token/validate', validateOAuthToken)

router.post('/logout', logout)

export default router;



