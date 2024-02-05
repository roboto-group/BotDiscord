require('dotenv').config();
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.on('message', (msg) => {
  const isWelcomeMessage = msg.type === 'GUILD_MEMBER_JOIN'
  if (isWelcomeMessage) {
    client.channels.cache.get('1194645892607783034').send(` seja bem vindo ao Servidor!!!`)
  };
});
//Function expression
(async() => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    
    eventHandler(client);
    
    client.login(process.env.TOKEN);

    
  
  } catch (error) {
    console.log(`Error: ${error}`);  
  }
})();
