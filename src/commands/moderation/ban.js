const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
  name: 'ban',
  'description': 'Banir quem tirar onda!',
  // 'devOnly': Boolean,
  // 'testOnly': Boolean,
  // 'deleted': Boolean,
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
  'permitionRequired': [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply('Ban...');
  },
}