
require('dotenv').config()

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

bot.onText(/\/callbackquery/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Click a button won't you!", {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Click me!",
                        callback_data: "click",
                    },
                ],
            ],
        },
    });
});


bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    bot.editMessageText("New Edited msg", {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      inline_message_id: callbackQuery.inline_message_id,
      reply_markup: {
        "inline_keyboard": [
            [
                {
                    text: "Click me!",
                    callback_data: "click",
                },
            ],
        ],
    },
    })
    // bot.answerCallbackQuery(callbackQuery.id)
    //     .then(() => bot.sendMessage(msg.chat.id, "You clicked!"));
});
