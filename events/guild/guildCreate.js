module.exports = (Discord, client, guild) => {
  console.log(`Joined a new guild ${guild.name}`)
  setTimeout(() => {
    memberObject.guild.roles.cache.find(role => role.name === "BetterStacy").setPosition(1);
  }, 10000)
};
