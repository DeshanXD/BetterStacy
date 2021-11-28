const { Discord, RichEmbed, MessageEmbed } = module.require("discord.js");
const getUserFromMention = require("../util/userId");

// exporting the module
module.exports = {
  name: "servermute",
  description: " Server mute random people!",
  async execute(client, message, args) {
    let userId = getUserFromMention(message);
    let userObject = client.users.cache.get(userId);
  
    const votemuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`${userObject.username}`, `${userObject.avatarURL()}`)
      .setDescription(
        `${userObject} You are getting vote muted by people on ${message.member.voice} initiated by ${message.author} `
      );
  
    // TODO fix: identify the user's voice state to make the command only be available in the voice chat
    try {
      if (userId === message.author.id) {
        await message.reply("Are you dumb? mention someone first!");
      } else if (!message.member.voice.channelId) {
        // console.log(message.member)
        console.log(message.member.voice.channelId);
        await message.reply(
          "You need to be in voice channel in order to run this command!"
        );
      } else {
        await message.channel.send({ embeds: [votemuteEmbed] });
      }
    } catch (e) {
      console.log(`!servermute commad debug: ${e}`);
    }
  },
};
