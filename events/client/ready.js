module.exports = (Discord, client) => {
  console.log(`${client.user.username} is online!`);
//   client.user.setActivity('discord.js', { type: 'PLAYING', status: 'dnd' });

client.user.setActivity("With Love!", {
    type: "PLAYING",
    // url: ""
  });
};
