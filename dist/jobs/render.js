"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awakeServer = awakeServer;
const axios_1 = __importDefault(require("axios"));
const croner_1 = __importDefault(require("croner"));
async function awakeServer() {
    (0, croner_1.default)("*/14 * * * *", async () => {
        try {
            await axios_1.default.get(process.env.APP_PROD_URL);
        }
        catch (e) {
            console.log(e);
        }
    });
}
