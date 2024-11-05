"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const jobs_1 = require("./jobs");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: [
        process.env.APP_DEV_URL,
        process.env.APP_PROD_URL,
        "http://localhost:4200",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, compression_1.default)());
// routers
app.use("/api/v1/college", routes_1.collegeStudentRouter, routes_1.collegeSubjectRouter, routes_1.collegeInstructorRouter);
app.use('/webhook', routes_1.webhookRouter);
// to prevent render hosting server termination
app.get("/", (req, res) => {
    res.send("Hello Server!");
});
app.get("/console", (req, res) => {
    console.log("console");
    res.send("Hello, Console!");
});
(0, jobs_1.awakeServer)();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is now listening to port ${PORT}.`));
