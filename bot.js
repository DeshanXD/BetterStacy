// Initialization
const Discord = require('discord.js')
const config = require('./config.json')
const fs = require('fs')

const prefix = config.prefix

// const client = new Discord.Client()
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
client.commands = new Discord.Collection()


// Reading commands from @commands directory
fs.readdir('./commands/', (err, files) => {
    if (err) {
        console.log(err);
    }
	
    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    
	if (jsFiles.length <= 0) {

		console.error("No commands found.");
		return;

	}

	console.log("Loading Commands...");

	jsFiles.forEach((f, i) => {

		let props = require(`./commands/${f}`);
		client.commands.set(props.help.name, props);

	});
})

// Reading event files from @events directory
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



client.on('messageCreate', async message => {
    if(message.author.bot) return;
    
    // this is pain in the ass
    let messageArray = message.content.split(/\s+/g)
    let command = messageArray[0]
    let args = messageArray.slice(1)

    let cmd = client.commands.get(command.slice(prefix.length))

    if (cmd) {
        cmd.run(client, message, args)
        
    }
})


client.login(config.token)