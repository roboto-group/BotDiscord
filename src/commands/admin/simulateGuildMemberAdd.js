const { Client, Interaction } = require('discord.js')

module.exports = {
 /**
  * 
  * @param {Client} client 
  * @param {Interaction} interaction 
  */
  callback: (client, interaction) => {
    const memberName = interaction.member
    interaction.client.emit('guildMemberAdd', memberName)
    interaction.reply({
      content: `Evento de adição de membro simulado para o usuário: ${memberName}.`,
      ephemeral: true,
    })
  },
  name: 'addmembro',
  description: 'Simula o guildMemberAdd',
  devOnly: true,
}