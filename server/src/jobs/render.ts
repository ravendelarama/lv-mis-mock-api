import axios from "axios";
import cron from "croner";
import environment from "../constants/environment";

export async function awakeServer() {
    cron("*/14 * * * *", async () => {
        try {
            await axios.get(environment.serviceUrl!);
        } catch (e) {
            console.log(e);
        }
    });
}