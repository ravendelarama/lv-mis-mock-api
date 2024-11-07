import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { awakeServer } from "./jobs";
import {
  collegeInstructorRouter,
  collegeStudentRouter,
  collegeSubjectRouter,
  webhookRouter,
} from "./routes";
import passport from "./config/passport-config";
import { generateJwt } from "./utils/helpers";

dotenv.config();

const app = express();
const server = http.createServer(app);

const redirectUri = process.env.NODE_ENV !== 'production' ? process.env.CLIENT_DEV_URL : process.env.CLIENT_PROD_URL

app.use(
  cors({
    origin: [
      process.env.SERVICE_DEV_URL!,
      process.env.SERVICE_PROD_URL!,
      process.env.CLIENT_DEV_URL!,
      process.env.CLIENT_PROD_URL!,
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(compression());

// routers
app.use("/api/v1/college", collegeStudentRouter,collegeSubjectRouter,collegeInstructorRouter);
app.use('/webhook', webhookRouter)


// Google Sign In
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
app.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: redirectUri }), async (req, res) => {
  
  const authToken = generateJwt({id: (req?.user as {id: string}).id}, {type: "access"})
  console.log('auth_token', authToken)

  res.cookie('auth_token', authToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 1000
  })
  
  console.log(req.user)
  res.redirect(`${redirectUri}`)
})

// to prevent render hosting server termination
app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.get("/console", (req, res) => {
  console.log("console");
  res.send("Hello, Console!");
});

// awakeServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Server is now listening to port ${PORT}.`)
);
