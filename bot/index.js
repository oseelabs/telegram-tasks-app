/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
var Telegraf = require("telegraf").Telegraf;
var _a = require("./config"), BOT_TOKEN = _a.BOT_TOKEN, WEBAPP_URL = _a.WEBAPP_URL;
if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN must be provided!');
}
var bot = new Telegraf(BOT_TOKEN);
// Basic commands
bot.command('start', function (ctx) {
    ctx.reply('Welcome to TaskBot! 🤖🚀 \n\nUse /help to see all available commands.');
});
bot.command('help', function (ctx) {
    ctx.reply('Available commands: \n\n' +
        '/start - Start the bot \n' +
        '/help - Show all available commands \n' +
        '/webapp - Open the Mini App \n');
});
bot.command('webapp', function (ctx) {
    var chatId = ctx.chat.id;
    // Encode the chatId to base64
    var encodedGroupId = Buffer.from(chatId.toString()).toString('base64');
    console.log('Chat ID: ', chatId);
    console.log('Encoded Group ID: ', encodedGroupId);
    ctx.reply('Open Web App', {
        reply_markup: {
            inline_keyboard: [[
                    {
                        text: "Open Web App",
                        url: "".concat(WEBAPP_URL, "/?startapp=").concat(encodedGroupId),
                    }
                ]]
        }
    });
});
bot.launch().then(function () {
    console.log('Bot is running...');
});
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
