import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { awakeServer } from "./jobs";
import {
  authRouter,
  collegeInstructorRouter,
  collegeStudentRouter,
  collegeSubjectRouter,
  gmsRouter,
  samsRouter,
  userRouter,
  webhookRouter,
} from "./routes";
import corsOptions from "./config/cors-config";
import environment from "./constants/environment";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions as CorsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(compression());

// routers
app.use("/api/v1/college", collegeStudentRouter, collegeSubjectRouter, collegeInstructorRouter);
app.use("/api/v1/users", userRouter);
app.use('/api/x-system', gmsRouter, samsRouter)
app.use('/webhook', webhookRouter)
app.use('/auth', authRouter)

// to prevent render hosting server termination
app.get("/", (req, res) => {
  res.send("Hello Server!");
});

// app.get("/test", (req, res) => {
//   const authToken = req.headers
//   res.json({authToken});
// });

awakeServer();

const PORT = environment.port || 3000;

server.listen(PORT, () =>
  console.log(`Server is now listening to port ${PORT}.`)
);
