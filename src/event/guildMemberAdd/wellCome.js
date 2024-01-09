const { Client, GuildMember, Interaction, Message } = require('discord.js');
const cpfCollector = require('../../commands/misc/cpfCollector');

/**
 * @param {Message} message
 * @param {Interaction} interaction
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member, interaction) => {
  console.log('Percebi o guildMemberAdd')
  try {
    
    await cpfCollector.callback(client, interaction)
    //Primeiro vamos verificar se o novo membro é um bot
    if (member.user.bot) return;
    //Mesagem direta
    await member.send(`Seja bem vindo ${member.displayName}`)
      .catch(error => console.log(`Erro em ${__filename}\n ${error}.`))
  } catch (error) {
    console.log(`Erro em ${__filename}:\n ${error}`)
  }
  const newMemberId = member.id
  const newMemberName = member.user.displayName

 

};
