const path = require('path')
const getAllFiles = require("../utils/getAllFiles");


// pega todos os eventos, importa e os chamar

module.exports = (client, arg) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'event'), true) 
  
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder)
    eventFiles.sort((a, b) => a > b)
    
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()
    
    
    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        
        
        await eventFunction(client, arg);
      };
    });
  };
};