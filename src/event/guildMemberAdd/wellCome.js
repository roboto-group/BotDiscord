const { Client, GuildMember, Interaction } = require('discord.js');
const cpfCollector = require('../../commands/misc/cpfCollector');

/**
 * @param {Interaction} interaction
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, interaction) => {
  
  await cpfCollector.callback(client, interaction)

};
