const { ApplicationCommandOptionType, Client, Events, GuildMember } = require('discord.js');


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
   * 
   * @param {Client} client 
   * @param {Events} event 
   */
  callback: async (client, event) => {
    console.log(event)
    // coletando o timestamp da deferReply
    //const valorCpf = interaction.
    console.log(GuildMember.name)
   
      
  }
}