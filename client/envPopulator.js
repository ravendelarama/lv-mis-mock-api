const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
require('dotenv').config({ path: './.env' });

const isProduction = process.env.NODE_ENV === 'production';

const envFile = `export const environment = {
    NODE_ENV: '${process.env.NODE_ENV}',
    CLIENT_URL: '${isProduction ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL}',
    SERVICE_URL: '${isProduction ? process.env.PROD_SERVICE_URL : process.env.DEV_SERVICE_URL}',
    SAMS_CLIENT_URL: '${isProduction ? process.env.PROD_SAMS_CLIENT_URL : process.env.DEV_SAMS_CLIENT_URL}',
    SAMS_SERVICE_URL: '${isProduction ? process.env.PROD_SAMS_SERVICE_URL : process.env.DEV_SAMS_SERVICE_URL}',
    GMS_CLIENT_URL: '${isProduction ? process.env.PROD_GMS_CLIENT_URL : process.env.DEV_GMS_CLIENT_URL}',
    GMS_SERVICE_URL: '${isProduction ? process.env.PROD_GMS_SERVICE_URL : process.env.DEV_GMS_SERVICE_URL}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});