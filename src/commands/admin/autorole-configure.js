const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const Autorole = require('../../models/AutoRole');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    //Checando se o comando foi executado em um servidor
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'Este comando só pode ser executado de um servidor.'
      })
      return;
    }
    
    const targetRoleId = interaction.options.get('role').value;
      
    try {
      await interaction.deferReply();

      var autorole = await Autorole.findOne({  guildId: interaction.guild.id });

      if (autorole) {
        //Checando no BD se há um registro com esse mesmo cargo
        if (autorole.roleId === targetRoleId) {
          interaction.editReply('Autorole já foi configurado para esse cargo. Para desabilitar, execute "/autoerole-disable"')
          return;
        }

        // Se a condição acima for falsa
        autorole.roleId = targetRoleId;
      
        
      } else {
        autorole = new Autorole({
          roleId: targetRoleId,
          guildId: interaction.guild.id,

        })
      }
      //Salvanaldo alterações no BD
      await autorole.save();
      //Respondendo ao usuário
      interaction.editReply('Autorole configurado com sucesso. Para desabilitar, execute "/autoerole-disable"')

    } catch (error) {
      
    }

  },
  name: 'autorole-configure',
  description: 'Configura seu auto-role para este servidor.',
  devOnly: true,
  options: [
    {
      name: 'role',
      description: 'O cargo que você quer que os usuarios tenham quando entrarem no servidor.',
      type: ApplicationCommandOptionType.Role,
      required: true,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.ManageRoles],

}