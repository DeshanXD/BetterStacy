const { MessageActionRow } = require("discord.js");


// const NodeCache = require("node-cache");
// const users = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = (Discord, client, interaction) => {
  // TODO: Make it only works for buttons
  if (!interaction.isButton()) return;

  if (interaction.customId === "vote" || "decline") {

    // Change the style of received button component
    interaction.component.setDisabled(true);

    console.log(num)
    // Respond to the interaction,
    // and send updated component to the Discord API
    interaction.update({
      components: [new MessageActionRow().addComponents(interaction.component)],
    });
  }
};
