module.exports = (Discord, client) => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

//   client.user.setActivity('discord.js', { type: 'PLAYING', status: 'dnd' })

client.user.setActivity("!help | betterstacy.me", {
    type: "PLAYING",
    // url: ""
  });
};
