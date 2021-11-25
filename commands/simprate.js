const  Discord = module.require('discord.js')

// Add cache system for the command
const NodeCache = require( "node-cache" );
const simpCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );


function simpRate() {
    
     return Math.floor(Math.random() * 100) + 1 + '%'
}

module.exports.run = async (bot, message, args) => {

    try {

        
        if (simpCache.get(message.author.id) != null) {
            
            rate = simpCache.get(message.author.id).e
            await message.reply(`You are ${rate} simp in this server`)

        } else {

            
            rate = simpRate()
            success = simpCache.set(message.author.id, { e: rate })


            await message.reply(`You are ${rate} simp in this server`)
        }


        
    } catch (e) {
        console.log(`simprate commad debug: ${e}`);
    }
}


// exporting the module

module.exports.help= {
    name: "simprate",
    desc: " How much of a simp are you"
}