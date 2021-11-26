const  Discord = module.require('discord.js')

// Add cache system for the command
const NodeCache = require( "node-cache" );
const simpCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );


function simpRate() {
    
     return Math.floor(Math.random() * 100) + 1 + '%'
}

module.exports.run = async (bot, message, args) => {

    try {

        const userId = (message.mentions.members.first()) ? message.mentions.members.first().user.id : message.author.id

        let rate = simpCache.get(userId) ? simpCache.get(userId) : null 


        switch (userId) {
            case 314225633196507136:
                    await message.reply(`You are the biggest simp in observable universe!`)
                break;
            default:
                if (rate) {
                    await message.reply(`You are ${rate.e} simp in the simp Universe`)
                    
                } else {
                    rate = simpRate()
                    s = simpCache.set(userId, { e: rate })

                    await message.reply(`You are ${rate} simp in the simp Universe`)

                }
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