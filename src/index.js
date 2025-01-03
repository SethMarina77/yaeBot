const { Client, IntentsBitField } = require("discord.js");
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on('ready', (c) => {
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

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const num1 = interaction.options.get('first-number').value;
  const num2 = interaction.options.get('second-number').value;

  interaction.reply(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
  
  client.on('messageCreate', (msg) => {
    if(msg.author.bot) // ignore bot messages so it doesn't reply to it's own messages
        return;

  if (msg.content !== '') {
    msg.reply('perhaps you can entertain me with something other than silly numbers?');
  }
});







  /*
  if (interaction.commandName === 'hey') {
    interaction.reply("Hmmph, and what do you need exactly?, I don't have all day");
  } else if (interaction.commandName === 'play-a-game') {
    interaction.reply("Oh, you want to play a game with me? I'm afraid I can't do that, I'm too busy");
  }
  */
});

client.login(
  process.env.TOKEN
);
