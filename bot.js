// Initialization
const Discord = require('discord.js')
const config = require('./config.json')
const fs = require('fs')

const prefix = config.prefix

// const client = new Discord.Client()
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
client.commands = new Discord.Collection()


// FILE READ ASYNC
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


// EVENT HANDLING
client.on('ready', async () => {
    console.log(`${client.user.username} is activated`);

    client.user.setActivity(`With Love`)

    // client.generateInvite({
    //     // Fix Perms scheme {TEMP: ADMIN}
    //     permissions : ['ADMINISTRATOR'],
    // })

    // .then(link => console.log(`${link}`))
})


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