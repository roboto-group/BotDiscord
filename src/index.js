require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers
  ]
})

client.on('ready', (robo) => {
  console.log(`${robo.user.username} está online e ligado nas paradas!!`)
})

client.login(process.env.TOKEN)

