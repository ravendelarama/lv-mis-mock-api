import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request } from "express";
import http from "http";
import { awakeServer } from "./jobs";
import {
  collegeInstructorRouter,
  collegeStudentRouter,
  collegeSubjectRouter,
  webhookRouter,
} from "./routes";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [
      process.env.APP_DEV_URL!,
      process.env.APP_PROD_URL!,
      "http://localhost:4200",
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

// to prevent render hosting server termination
app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.get("/console", (req, res) => {
  console.log("console");
  res.send("Hello, Console!");
});

awakeServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Server is now listening to port ${PORT}.`)
);
