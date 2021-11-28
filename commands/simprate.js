const Discord = module.require("discord.js");

// Add cache system for the command
const NodeCache = require("node-cache");
const simpCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

//util imports
const getUserFromMention = require("../util/userId");

function simpRate() {
  return Math.floor(Math.random() * 100) + 1 + "%";
}

// exporting the command name+

module.exports = {
  name: "simprate",
  description: " How much of a simp are you",

  async execute(client, message, args) {
    try {
      let userId = getUserFromMention(message);
      let rate = simpCache.get(userId) ? simpCache.get(userId) : null;

      switch (userId) {
        case "314225633196507136":
          await message.reply(
            `You are the biggest Simp in observable universe!`
          );
          break;

        case "e":
          await message.reply(`Are you dumb? You can't mention roles`);
          break;
        default:
          if (rate) {
            await message.reply(`You are ${rate.e} Simp in the Simpverse`);
          } else {
            rate = simpRate();
            s = simpCache.set(userId, { e: rate });

            await message.reply(`You are ${rate} Simp in the Simpverse`);
          }
      }
    } catch (e) {
      console.log(`simprate commad debug: ${e}`);
    }
  },
};
