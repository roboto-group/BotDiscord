const { testServer } = require('../../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent')


module.exports = async (client) => {
  
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer)
    

    

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      )
        
      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑️ Comando deletado: ${name}.`)
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            decription,
            options,
          });
          console.log(`🔄️ Comando editado: ${name}`)
        };
      } else {
        if (localCommand.deleted) {
          console.log(`⏭️ Pulando registro desse comando, pois está marcado como deletado: ${name}`);
          continue;
        };
        //Só será executado se o comando não existir ou não estar marcado como deletado
        await applicationCommands.create({
          name,
          description,
          options,
        })
        console.log(`👍 comando registrado: ${name}`)
      }
    }

  } catch (error) {
    console.log(error)
  }
      
};