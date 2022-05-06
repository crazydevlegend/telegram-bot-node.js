
require('dotenv').config()

const { randomInt } = require('crypto');
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

bot.onText(/\/callbackquery/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Click a button won't you!", {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                      text: "Edit me!",
                      callback_data: `/edit ${randomInt(100000, 999999)}`,
                    },
                    {
                      text: "Reply to me!",
                      callback_data: `/reply ${randomInt(100000, 999999)}`,
                    },
                ],
            ],
        },
    });
});


bot.on("callback_query", (callbackQuery) => {
    
  const msg = callbackQuery.message;
  const callbackData = callbackQuery.data;

  if (callbackData.match(/\/edit [0-9]{6}/)) {
    
    const param = callbackData.split(' ')[1];
    const  newText = `Edited message at ${param}`;

    if (msg.text === newText) return;

    bot.editMessageText(newText, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      inline_message_id: callbackQuery.inline_message_id,
      reply_markup: {
        "inline_keyboard": [
            [
              {
                text: "Edit me!",
                callback_data: `/edit ${randomInt(100000, 999999)}`,
              },
              {
                text: "Reply to me!",
                callback_data: `/reply ${randomInt(100000, 999999)}`,
              },
            ],
        ],
      },
    })
  } else if (callbackData.match(/\/reply/)) {
    bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "Here's the reply message!")); 
  }
});
