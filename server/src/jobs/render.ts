import axios from "axios";
import cron from "croner";

export async function awakeServer() {
    cron("*/14 * * * *", async () => {
        try {
            await axios.get(process.env.PROD_SERVICE_URL!);
        } catch (e) {
            console.log(e);
        }
    });
}