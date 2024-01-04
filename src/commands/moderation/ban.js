const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Banir quem estiver tirando onda no servidor!',
  // 'devOnly': Boolean,
  // 'testOnly': Boolean,
  //'deleted': true,
  options: [
    {
      name: 'target-user',
      description: 'O cara que tirou onda.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Qual foi a gracinha que ele soltou.',
      required: false,
      type: ApplicationCommandOptionType.String,
    }
  ],
  'permissionsRequired': [PermissionFlagsBits.Administrator],
  'botPermissions': [PermissionFlagsBits.Administrator],
  callback: (client, interaction) => {
    interaction.reply('Ban...');
  },
}