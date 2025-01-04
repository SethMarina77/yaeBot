const { Client, IntentsBitField } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

/*
client.on('messageCreate', (msg) => {
    if(msg.author.bot) // ignore bot messages so it doesn't reply to it's own messages
        return;

  if (msg.content === 'hi') {
    msg.reply('hello traveller, how can I help you today?');
  }
});
*/
let addCommandUsed = false;

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.getNumber("first-number");
    const num2 = interaction.options.getNumber("second-number");

    await interaction.reply(`The sum of ${num1} and ${num2} is ${num1 + num2}`);

    addCommandUsed = true;
  }

  if (interaction.commandName === "riddle") {
    await interaction.reply(
      "Here's a tricky riddle for you: *What is always in front of you but can’t be seen?*"
    );
  }
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return; // Ignore bot messages

  if (addCommandUsed) {
    msg.reply(
      "Perhaps you can entertain me with something other than silly numbers?"
    );
    addCommandUsed = false;
  }

  if (msg.content.toLowerCase().includes("the future" || "thefuture")) {
    await msg.reply("Correct! You're smarter than you look!");
  } else if (msg.content.toLowerCase() !== "the future" || "thefuture") {
    await msg.reply("Incorrect! Try again!");
  }
});

/*
  if (interaction.commandName === 'hey') {
    interaction.reply("Hmmph, and what do you need exactly?, I don't have all day");
  } else if (interaction.commandName === 'play-a-game') {
    interaction.reply("Oh, you want to play a game with me? I'm afraid I can't do that, I'm too busy");
  }
  */

client.login(process.env.TOKEN);
