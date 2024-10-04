import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { awakeServer } from "./jobs";
import { collegeInstructorRouter, collegeStudentRouter, collegeSubjectRouter } from "./routes";
import { db } from "./models";
import { response } from "./utils/response";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [process.env.APP_DEV_URL!, process.env.APP_PROD_URL!, 'http://localhost:4200'],
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
app.use("/college", collegeStudentRouter, collegeSubjectRouter, collegeInstructorRouter);

// to prevent render hosting server termination
app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.get("/try", async (req, res) => {
  const studentsTakingSubjectInSection = await db.collegeStudent.findMany({
    where: {
      studentSections: {
        some: {
          sectionId: "66f9471b33e226fd2e700d61", // Replace with the actual section ID
        },
      },
      studentSubjects: {
        some: {
          subjectId: "66f9522a33e226fd2e700d7f", // Replace with the actual subject ID
        },
      },
    },
  });

  response(res, 200, true, null, studentsTakingSubjectInSection);
});
awakeServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Server is now listening to port ${PORT}.`)
);
