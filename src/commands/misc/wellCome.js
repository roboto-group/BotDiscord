const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const User = require('../../models/Users');

module.exports = {
  /**
   * 
   * @param {Client} client 
   * @param {Interaction} interaction 
   */
  callback: async (client, interaction) => {

    const idCargoFront = '1186625105565061120'
    const idCargoBack = '1186625588874706955'

    try {
      //verifica se o usuario pe um robo
      if (interaction.user.bot) return;

      //verifica se a interacao foi feita de dentro de um servidor
      if (!interaction.inGuild()) return;

      //Será necessário construir uma validação para o CPF -> @Marlos, se garante??
      const cpf = interaction.options._hoistedOptions[0].value
      
      await interaction.deferReply();

      //criando a consulta
      let query = {
        userId: interaction.user.id,
        guildId: interaction.user.id,
      };

      //fazendo a consulta ao BD
      let user = await User.findOne(query);

      //Se o usuario existir no BD
      if (user) {
        //const lastDailyDate = user.lastDaily.toDateString();
        //const currentDate = new Date().toDateString();
        console.log('Usuario já consta no banco de dados!')
        if (user.cpf !== cpf) {
          
          interaction.editReply(`CPF: ${cpf} não cadastrado!`);
          
          
        } else {
          
          console.log('CPF bate com o cadastrado')
          
          //resposta ao usuário
          interaction.editReply(
            `${user.userName} é um aluno do curso de ${user.curso} do turno da ${user.horario}.`
          );

          const novoUser = interaction.member
          
          //removendo cargo de Não-verificado
          novoUser.roles.remove('1194646146325426176');
          
          if (user.curso === 'frontend') {
            
            //passando o cargo
            novoUser.roles.add(idCargoFront);
          } else if (user.curso === 'backend') {
            //passando o cargo
            novoUser.roles.add(idCargoBack);
          };
            
        }
      } else { // caso o usuário não exista no BD
        /* user = new User({
          ...query,
          lastDaily: new Date(), //data atual
        }) */
        interaction.editReply('Usuário não exite no banco de dados')
        return;
      }


    } catch (error) {
      console.log(error)
    }
  },
  
  name: 'verify',
  description: 'Verifica se o novo usuário é um aluno',
  options: [
    {
      name: 'cpf',
      description: 'Digite seu CPF:',
      required: true,
      type: ApplicationCommandOptionType.String,
    }
  ]
}

