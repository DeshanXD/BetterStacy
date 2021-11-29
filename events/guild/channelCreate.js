module.exports = async (Discord, client, channel) => {
  // console.log(`channelCreate: ${channel}`);

  let msg = await channel.send("Admin approval needed to proceed on the chat")
   await msg.react('✅');
   await msg.react('❎');

   // TODO: AwaitReactions not working for some reason

  await msg.createReactionCollector(r => ['✅', '❎'].includes(r.emoji.name), {max: 1}, {time: 15000})
    .on('collect', r => {
      // let r = collected.first();
      if (r.emoji.name == '✅') 
        console.log('New channel has been added!')
          .then(() => { msg.delet(0) })
          .catch(console.error);
      else if (r.emoji.name == '❎') {
        channel.delete().then(console.log(`${channel.name} has been deleted!`)).catch(console.error)
      }

      // r.remove(r.users.last())
    });
};
