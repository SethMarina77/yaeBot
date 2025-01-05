const { Client, IntentsBitField } = require("discord.js");
const { getYaeMikoResponse } = require("./openai");  // Import the AI response function
const dotenv = require("dotenv");
dotenv.config();  // This loads the environment variables from your .env file



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;  // Ignore bot messages

  const userMessage = msg.content;

  // Get Yae Miko's response using the AI
  const yaeMikoResponse = await getYaeMikoResponse(userMessage);

  // Send the response to the Discord channel
  await msg.reply(yaeMikoResponse);
});

client.login(process.env.TOKEN);
