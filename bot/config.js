/* eslint-disable @typescript-eslint/no-require-imports */
var config = require('dotenv').config;
var resolve = require('path').resolve;
config();
config({
    path: resolve(__dirname, '../.env.local')
});
module.exports = {
    BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    WEBAPP_URL: process.env.WEBAPP_URL
};
