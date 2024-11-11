import dotenv from "dotenv";
dotenv.config();
const isProd = process.env.NODE_ENV === 'production'
const environment = {
    isProd,
    port: process.env.PORT,
    samsClientUrl: isProd ? process.env.PROD_SAMS_CLIENT_URL:process.env.DEV_SAMS_CLIENT_URL,
    samsServiceUrl: isProd ? process.env.PROD_SAMS_SERVICE_URL:process.env.DEV_SAMS_SERVICE_URL,
    clientUrl: isProd ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL,
    serviceUrl: isProd ?process.env.PROD_SERVICE_URL: process.env.DEV_SERVICE_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookAccessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
}

export default environment