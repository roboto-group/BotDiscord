const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const { Font, RankCardBuilder } = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
  */
 callback: async (client, interaction) => {
    
    //1º Check: Se o comando foi executado no servidor
    if (!interaction.inGuild()) {
      interaction.reply('Você só pode executar esse comando dentro de um servidor.');
      return;
    }

    await interaction.deferReply();

    //Pegando o id do usuário mencionado.
    //Devido essa opção não ser required, precisamos colocar o '?' antes do valor
    const mentionedUserId = interaction.options.get('target-user')?.value
    //Se o mentionedUserId não existir, receba o id de quem está executando o comando. 
    const targetUserId = mentionedUserId || interaction.member.id;
    //Pegando o objeto do usuario alvo
    const targetUserObject = await interaction.guild.members.fetch(targetUserId);
    //Agora de posse do Objeto do Usuário Alvo podemos buscar o level do usuário no BD
    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    })
    //Se não houver match nessa query
    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId ? `${targetUserObject.user.tag} não tem nenhum nível, tente novamente quando ele conversar mais.` : 'Você ainda não ganhou nenhum XP. Converse um pouco e tente novamente.'
      )
      return;
    }

    //Aqui pegaremos o Ranking do usuário no banco de dados
    //para isso, precisamos saber onde o user está na lista de usuários.
    //pegando todos os níveis dos usuarios do servidor
    //esse '.select' é para não trazer todos os campos (um filtragem)
    var allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp') 

    allLevels.sort((a, b) => {
      //Se mesmo level, veja quem tem mais xp
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });


    Font.loadDefault();
    
    if (!targetUserObject.presence?.status) {
      var userPresence = 'offline' 
    } else {
      var userPresence = 'online'
    } 
    //Vamos pegar o index do usuário pelo seu ID.
    //Como o index começa em zero adicionamos 1 ao currentRank
    var currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1
    const rank = new RankCardBuilder()
      .setUsername(targetUserObject.user.username)
      .setDisplayName(targetUserObject.user.displayName)
      .setAvatar(targetUserObject.user.avatarURL())
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setLevel(fetchedLevel.level)
      .setRank(currentRank)
      .setStatus(userPresence);
    
    //transformando rank em imagem
    const data = await rank.build({
      format: 'png'
    });


    //criando um anexo com o data
    const attachment = new AttachmentBuilder(data);
    interaction.editReply({ files: [attachment] });
  },
  name: 'level',
  description: 'Mostra o seu nível (ou de alguém) no servidor.',
  options: [
    {
      name: 'target-user',
      description: 'O usuário que você quer saber o nível.',
      type: ApplicationCommandOptionType.Mentionable,
    }
  ]
}