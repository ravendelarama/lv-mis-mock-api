import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { awakeServer } from "./jobs";
import {
  authRouter,
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
app.use('/auth', authRouter)

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
