const { Client, Interaction } = require('discord.js')
const User = require('../../models/Users')

const dailyAmount = 1000;

//Objetivo: Fazer um comando que seja executado apenas uma vez por dia.
module.exports = {
  name: 'daily',
  description: 'Coletar os seus dailies',
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {

    //é uma mensagem de um servidor?
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'Esse comando só pode ser executado dentro do servidor.',
        ephemeral: true,
      });
      return;
    }

    //Try 'n catch aqui pq iremos fazer chamadas ao banco de dados.
    try {
      await interaction.deferReply();

      //criando a consulta
      var query = {
        userId: interaction.user.id,
        guildId: interaction.user.id,
      };

      //fazendo a consulta ao BD
      var user = await User.findOne(query);

      //Se o usuario existir no BD
      if (user) {
        const lastDailyDate = user.lastDaily.toDateString();
        const currentDate = new Date().toDateString();
        
        if (lastDailyDate === currentDate) {
          interaction.editReply(
            'Você já coletou os seus dailies hoje. Volte amanhã!'
          );
          return;

        } else {
          //Vamos adicionar ao balanço do usuário
          user.balance += dailyAmount;
          //atualizando o lastDaily do usuário
          user.lastDaily = new Date();
          //resposta ao usuário
          interaction.editReply(
            `${dailyAmount} foi adicionado ao seu balanço. Seu novo balanço é ${user.balance}.`
          );

        }
      } else { // caso o usuário não exista no BD
        user = new User({
          ...query,
          lastDaily: new Date(), //data atual
        })
      }

      //Vamos adicionar ao balanço do usuário
      user.balance += dailyAmount;

      //salvando no BD
      await user.save();

      //resposta ao usuário
      interaction.editReply(
        `${dailyAmount} foi adicionado ao seu balanço. Seu novo balanço é ${user.balance}.`
      );

    } catch (error) {
      console.log(`Erro com o comando /daily: ${error}`);
    }
  },
};