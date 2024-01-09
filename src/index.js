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

//Function expression
(async() => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://robotofap:1pMcQRdBec4qgCto@roboto.hqtaheu.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to DB.');
    
    eventHandler(client);
    
    client.login('MTE4NjQyMzY3MzgyMTg1NTc1NA.GbqsPd.JDRBt4PGMrDLXHbURnXoYyQCeKK_p0KGNiT-GQ');

    
  
  } catch (error) {
    console.log(`Error: ${error}`);  
  }
})();
