const { ApplicationCommandOptionType, Client, Events, GuildMember, Interaction } = require('discord.js');


module.exports = {
  name: 'pede-cpf',
  description: 'Saúda o no novo membro e solicita seu cpf.',
  //devOnly: Boolean,
  //testOnly: Boolean,
  //deleted: Boolean,
  
  options: [
    {
      name: 'cpf',
      description: 'Digite seu CPF:',
      type: ApplicationCommandOptionType.String,
      require: true,
      ephemeral: true,
    }
  ],
  /**
   * @param {Interaction} interaction 
   * @param {Client} client 
   * @param {Events} event 
   */
  callback: async (client, event, interaction) => {
    console.log('Dentro do Coletor de CPF')
    const cpf = interaction.options.getString("texto", true)
    //const valorCpf = interaction.
  }
}
    
   
      