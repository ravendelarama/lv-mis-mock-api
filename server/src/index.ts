import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { awakeServer } from "./jobs";
import { authRouter, instructorRouter, studentRouter, collegeSubjectRouter, gmsRouter, samsRouter, userRouter, webhookRouter, strandRouter, collegeProgramRouter, collegeSectionRouter } from "./routes/index.route";
import corsOptions from "./config/cors-config";
import environment from "./constants/environment";
import { db } from "./models";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions as CorsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// routers
app.use("/api/v1/college", collegeSubjectRouter, collegeProgramRouter, collegeSectionRouter);
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/instructors', instructorRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/strands", strandRouter);
app.use('/api/x-system', gmsRouter, samsRouter)
app.use('/webhook', webhookRouter)
app.use('/auth', authRouter)

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

console.log(environment.isProd, 'IS PROD?!')

app.get('/truncate-all', async (req, res) => {
  // await db.collegeInstructorSubject.deleteMany({})
  // await db.collegeStudentProgram.deleteMany({})
  await db.collegeStudentSection.deleteMany({})
  // await db.collegeStudentSubject.deleteMany({}) 
  // await db.collegeSubjectSection.deleteMany({})

  res.json({
    message: "All collections have been truncated successfully."
  })

})

app.get('/test', async (req, res) => {
  const docs = await db.collegeStudentSection.findMany({
    include: {
      collegeSection: true, 
      student: true
    }
  })

  res.json({
    message: "Test successful.",
    data: docs
  })
})

// app.get("/test", (req, res) => {
//   const authToken = req.headers
//   res.json({authToken});
// });

awakeServer();

const PORT = environment.port || 3000;

server.listen(PORT, () =>
  console.log(`Server is now listening to port ${PORT}.`)
);
