const { Client, GuildMember } = require('discord.js');
const Autorole = require('../../models/AutoRole');

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  try {
    var guild = member.guild;
    if (!guild) return;
  
    const autoRole = await Autorole.findOne({ guildId: guild.id })
    //Se não houver um match
    if (!autoRole) return;
    //Havendo um match passaremos um cargo para o novo membro
    await member.roles.add(autoRole.roleId)

  } catch (error) {
    console.log(`Erro ao dar cargo automaticamente: ${error}`)
  }
};