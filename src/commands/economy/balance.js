const { Client, Interaction, ApplicationCommandOptionType } = require("discord.js");
const User = require('../../models/Users');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {
    //Verificar se a interação foi foi feita de dentro de um servidor
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'Esse comando só pode ser executado de dentro de um sevidor.',
        ephemeral: true,
      })
      return;
    };

    //Pegando o ID do usuário que for escolhido ou se nenhum for escolhido pegamos o id do executante

    const targetUserId = interaction.options.get('user')?.value || interaction.member.id;

    await interaction.deferReply();

    const user = await User.findOne({ userId: targetUserId, guildId: interaction.guild.id })

    //verificando se a consulta ao banco de dados retornou negativa
    if (!user) {
      interaction.editReply(`<@${targetUserId}> ainda não tem um perfil no banco de dados.`);
      return;
    } 

    //Se a consulta ao BD retornar positiva

    interaction.editReply(
      //verificando se o usuário mencionado é o mesmo que está executando o comando.
      targetUserId === interaction.member.id
        ? `Seu balance é **${user.balance}**`
        : `O balance de <@${targetUserId}> é **${user.balance}**`
    );

  },
  name: 'balance',
  description: 'Ver seu balanço ou de algum outro membro.',
  options: [
    {
      name: 'user',
      description: 'O usuário dono do balanço que você quer ver.',
      type: ApplicationCommandOptionType.User,
    }
  ]
};