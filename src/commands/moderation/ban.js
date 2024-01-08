const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason')?.value || 'Nenhuma rasão foi fornecida.';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    // esse usuário existe nesse servidor?
    if (!targetUser) {
      await interaction.editReply('Este usuário não existe neste servidor.');
      return;
    }

    //esse usuário é o dono do server?
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply('O dono do servidor não pode ser banido.');
      return;
    };

    //esse usuário é bot ou é o user executando o comando?
    
    // Pegando cargo mais alto do alvo
    const targetUserRolePosition = targetUser.roles.highest.position; 
    // Pegando cargo mais alto de quem está utilizando o comando
    const requestUserRolePosition = interaction.member.roles.highest.position;
    // Pegando cargo mais alto do bot
    const botRolePosition = interaction.guild.members.me.roles.highest.position;
    
    // Vamos comparar os 3, que retornam valores numéricos.
    if (targetUserRolePosition >= requestUserRolePosition) {
      interaction.editReply('Você não pode banir esse usuário, pois ele tem maior ou mesmo cargo que você.');
      return;
    };

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply('Eu não posso banir este usuário, pois ele tem o mesmo ou maior cargo que eu.');
      return;
    };

    // Banir usuário alvo :D
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(`O usuário ${targetUser} foi banido.\nMotivo: ${reason}`)
    } catch (error) {
      console.log(`Houve um erro no banimento: ${error}`);
    };

  },

  name: 'ban',
  description: 'Banir quem estiver tirando onda no servidor!',
  // 'devOnly': Boolean,
  // 'testOnly': Boolean,
  // 'deleted': true,
  options: [
    {
      name: 'target-user',
      description: 'O cara que tirou onda.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Qual foi o motivo do banimento.',
      required: false,
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
  
}