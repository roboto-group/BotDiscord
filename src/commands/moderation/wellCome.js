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
      
      await interaction.deferReply({ephemeral: true});

      //criando a consulta
      let query = {
        cpf: cpf
      };

      //fazendo a consulta ao BD
      let user = await User.findOne(query);

      //Se o usuario existir no BD
      if (user) {
        console.log('Achei seu CPF no banco de dados!')
        
        // Verificando se o userId e o guildId estão vazios no BD e atualizando-os.
        
        if (!user.userId) {
          console.log('userId do Discord foi vinculado ao CPF')
          user.userId = interaction.user.id
          if (!user.guildId) {
            console.log('guildId atualizado!');
            user.guildId = interaction.guild.id;
          }
          console.log('Atualizações salves do Banco de Dados.');
          await user.save();
        }; 
          
        //resposta ao usuário
        await interaction.editReply({
          content: `${user.userName} é um aluno do curso de ${user.curso} do turno da ${user.horario}.`,
          ephemeral: true,
        });
          
        
        const novoUser = interaction.member
        
        //Dando um tempo para que o usuario veja a respota do BOT
        setTimeout(()=>{
          
          //removendo cargo de Não-verificado
          novoUser.roles.remove('1194646146325426176');
          
        }, 3000)
        
        if (user.curso === 'frontend') {
          
          //passando o cargo
          novoUser.roles.add(idCargoFront);
        } else if (user.curso === 'backend') {
          //passando o cargo
          novoUser.roles.add(idCargoBack);
        };
            
        
      } else { // caso o usuário não exista no BD
        
        interaction.editReply(`Não consegui encontrar seu CPF no banco de dados! 😒 Entre em contato com o Adm do curso.`)
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

