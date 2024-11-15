import dotenv from "dotenv";
dotenv.config();
const isProd = process.env.NODE_ENV === 'production'
const environment = {
    isProd,
    mongoDatabase: process.env.DATABASE_URL,
    port: process.env.PORT,

    clientUrl: isProd ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL,
    serviceUrl: isProd ? process.env.PROD_SERVICE_URL: process.env.DEV_SERVICE_URL,
 
    samsClientUrl: isProd ? process.env.PROD_SAMS_CLIENT_URL : process.env.DEV_SAMS_CLIENT_URL,
    samsServiceUrl: isProd ? process.env.PROD_SAMS_SERVICE_URL : process.env.DEV_SAMS_SERVICE_URL,
 
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
 
    facebookAccessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    facebookPageId: process.env.FACEBOOK_PAGE_ID,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
 
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
}

export default environment