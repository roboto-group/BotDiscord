const {ApplicationCommandOptionType} = require('discord.js');


module.exports = {
  name: 'welcome',
  description: 'Manda um boas vindas para o novo usuario',
  //devOnly: Boolean,
  //testOnly: Boolean,
  //deleted: Boolean,
  require: true,
  ephemeral: true,
  options: [
    {
      name: 'cpf',
      description: 'pede o cpf do user.',
      type: ApplicationCommandOptionType.String,
      
    }
  ],

  callback: async (client, interaction) => {
    interaction.deferReply();
    // coletando o timestamp da deferReply
    const valorCpf = await interaction.options.get('cpf').value

    
    interaction.editReply({
      content: `O valor do COF digitado foi ${valorCpf}.`
    })
      
  }
}