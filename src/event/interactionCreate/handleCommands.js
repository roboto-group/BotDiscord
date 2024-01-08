const { testServer, devs } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

//Manuseando comandos
module.exports = async (client, interaction) => {
  //é comando de chat?
  if (!interaction.isChatInputCommand()) return;
  
  
  const localCommands = getLocalCommands();
  
  try {

    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    //é um comando existente?
    if (!commandObject) return;
    
    //comando é apenas para devs?
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Apenas desenvolvedores podem usar esse comando.',
          ephemeral: true,
        });
        return;
      };
    }

    //é comando marcado como teste?
    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'Este comando não pode ser executado neste servidor.',
          ephemeral: true,
        });
        return;
      };
    };
    
    //Usuário tem permissão?
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Você não tem permissão para usar esse comando.',
            ephemeral: true,
          });
          return;
        }
      };
    };

    
    
    //Bot tem permissão?
    if (commandObject.botPermissions?.length) {
      
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: 'Eu não tenho permisão suficiente.',
            ephemeral: true,
          })
          return;
        }
      };
      
    };
    
    //Execução do comando.
    await commandObject.callback(client, interaction);

  } catch (error) {
    console.log(`Houve um erro ao executar esse comando: ${error}`)
  }
};