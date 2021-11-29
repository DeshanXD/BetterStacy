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
    // let m1emberObject = message.mentions.users.first().member

    // console.log(m1emberObject)
    let memberObject = message.guild.members.cache.get(userId)
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

        const currentVoiceMembers = message.member.voice.channel.members
        
        const filter = (reaction, user) => {
          return reaction.emoji.name === '✅' && user.id === currentVoiceMembers.find(m => m.user.id).user.id
        }


        await deliverd_message.awaitReactions({ filter, time: 10_000 })
          .then(collected => {
            console.log(`Collected ${collected.size} reactions`)

            if (collected.size >= (currentVoiceMembers.size / 2)){
              memberObject.voice.setMute(true)

              setTimeout(() => {
                memberObject.voice.setMute(false)
              }, 10_000)
            }
          })
          .catch(console.error);


      }
    } catch (e) {
      console.log(`!servermute commad debug: ${e}`);
    }
  },
};
