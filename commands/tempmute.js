const {
  Discord,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const getUserFromMention = require("../util/userId");

// exporting the module
module.exports = {
  name: "tempmute",
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
        `You are getting vote muted by people on channel | ${message.member.voice.channel.name} | initiated by ${message.author} `
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
            // console.log(`Collected ${collected.size} reactions`)
            deliverd_message.delete();
            if (collected.size >= (currentVoiceMembers.size / 2)){
              memberObject.voice.setMute(true)
              
              // if((role = memberObject.guild.roles.cache.find(role => role.name === "StacyHateYou")) === null){
              //   memberObject.guild.roles.create({
              //     name: 'StacyHateYou',
              //     color: 'BLUE',
              //     reason: 'Stacy want to mute people',
              //     permissions: {
              //       MUTE_MEMBERS : false
              //     },
              //     position: 1
              //   })
              //   role = memberObject.guild.roles.cache.find(role => role.name === "StacyHateYou")
              //   memberObject.roles.add(role);
              // } else {
              //   memberObject.roles.add(role);
              // }

              console.log(`Muted ${memberObject.user}`)

              setTimeout(() => {
                memberObject.voice.setMute(false)
                // memberObject.roles.remove(role);
                console.log(`Unmuted ${memberObject.user}`)
              }, 45_000)
            }
          })
          .catch(console.error);


      }
    } catch (e) {
      console.log(`!tempmute commad debug: ${e}`);
    }
  },
};
