const {
  Discord,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const getUserFromMention = require("../util/userId");

// exporting the module
module.exports = {
  name: "servermute",
  description: " Server mute random people!",

  async execute(client, message, args) {
    let userId = getUserFromMention(message);
    let userObject = client.users.cache.get(userId);

    // console.log(userObject)

    const votemuteEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`${userObject.username}`, `${userObject.avatarURL()}`)
      .setDescription(
        `${userObject} You are getting vote muted by people on ${message.member.voice.channel.name} initiated by ${message.author} `
      );

    // TODO fix: identify the user's voice state to make the command only be available in the voice chat
    try {
      if (userId === message.author.id) {
        await message.reply("Are you dumb? mention someone first!");

        } else if (!message.member.voice.channelId) {
          await message.reply(
            "You need to be in voice channel in order to run this command!"
          );
      } else {
        let deliverd_message = await message.channel.send({
          embeds: [votemuteEmbed],
          ephemeral: true,
          fetchReply: true,
        });

        await deliverd_message.react("✅");
        
        const filter = (reaction, user) => {

          
          console.log(message.member.voice.channel.members.forEach(m => m.guild.id))


          return reaction.emoji.name === '✅' && user.id === message.member.voice.channel.members.forEach(m => m.user.id)

        }
        deliverd_message.awaitReactions({ filter, time: 10_000 })
          .then(collected => console.log(`Collected ${collected.size} reactions`))
          .catch(console.error);


      }
    } catch (e) {
      console.log(`!servermute commad debug: ${e}`);
    }
  },
};
