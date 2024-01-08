const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const Autorole = require('../../models/AutoRole');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();
      //vamos verificar se existe um documento com esse guildId no BD
      if (!(await Autorole.exists({ guildId: interaction.guild.id }))) {
        interaction.editReply('Autorole não foi configurado para esse servidor. Execute "/autorole-configure para acionar.');
        return;
      }
      //caso exista o match, faremos a exclusão
      await Autorole.findOneAndDelete({ guildId: interaction.guild.id });
      //resposta para o usuário
      interaction.editReply('Autorole desabilitado para esse servidor. Execute "/autorole-configure para aciona-lo novamente.');

    } catch (error) {
      console.log(`Erro ao desabilitar autorole: ${error}`)
    }
  },
  name: 'autorole-disable',
  description: 'Desabilita autorole nesse servidor.',
  parmissionsRequired: [PermissionFlagsBits.Administrator]
}