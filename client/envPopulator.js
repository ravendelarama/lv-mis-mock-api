const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
require('dotenv').config({path: './.env'}); ;

const envFile = `export const environment = {
    APP_URL: '${process.env.APP_URL}',
    SERVICE_URL: '${process.env.SERVICE_URL}',
    SAMS_CLIENT_URL: '${process.env.SAMS_CLIENT_URL}',
    SAMS_SERVICE_URL: '${process.env.SAMS_SERVICE_URL}',
    GMS_CLIENT_URL: '${process.env.GMS_CLIENT_URL}',
    GMS_SERVICE_URL: '${process.env.GMS_SERVICE_URL}',
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