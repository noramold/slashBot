

const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
      .setName("create")
      .setDescription("Create roles")
      .addSubcommand(subcommand =>
          subcommand
            .setName('color')
            .setDescription('Color of new role ')
            .addUserOption(option => option.setName('target').setDescription('The color')))
      .addSubcommand(subcommand =>
          subcommand
            .setName('name')
            .setDescription('name of the role'
      )),
    async execute(interaction){
      interaction.reply({
        content: "what the is up?", 
        ephemeral: false, // only visible to the person executing the command 
    });

    },
};

