require('dotenv').config();
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler')


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers
  ],
});

//Function expression
(async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    
    eventHandler(client);
  } catch (error) {
    console.log(`Error: ${error}`);  
  }
})();


client.login(process.env.TOKEN);

