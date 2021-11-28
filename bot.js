const Discord = require("discord.js");
const config = require('./config.json')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// reading from handlers
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})


client.login(config.token);
