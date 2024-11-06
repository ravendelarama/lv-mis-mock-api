import axios from "axios";
import cron from "croner";

export async function awakeServer() {
    cron("*/14 * * * *", async () => {
        try {
            await axios.get(process.env.SERVICE_PROD_URL!);
        } catch (e) {
            console.log(e);
        }
    });
}