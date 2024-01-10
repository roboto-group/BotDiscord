const { Client, GuildMember, Interaction, ModalBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const cpfCollector = require('../../commands/misc/cpfCollector');

const channel_id = '1180816513184313398'
/**
 * 
 * @param {Interaction} interaction
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async (client, member) => {
  console.log('Percebi o guildMemberAdd')
  const channel = member.guild.channels.cache.get(channel_id);
  
  
  try {
    //Criando o modal (um formulário)
    const modal = new ModalBuilder({
      customId: 'cpf-modal',
      title: 'Verificação de Aluno FAP | Softex',
    });

    // criando o campo CPF
    const campoCpf = new TextInputBuilder()
    .setLabel('Digite seu CPF:')
    .setStyle(TextInputStyle.short)
    .setCustomId('cpf-input'); 

    //Primeiro vamos verificar se o novo membro é um bot
    if (member.user.bot) return;
    
    
    
    //construção do botao
    const BtEnviar = new ButtonBuilder()
      .setLabel('Enviar')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('bt-enviar');
      
    
    
    //Criando a linha do input e botão
    const campoCpfRow = new ActionRowBuilder().addComponents(campoCpf);
    
    modal.addComponents(campoCpfRow);

    //Mesagem direta
    await member.showModal(modal);
    

  } catch (error) {
    console.log(`Erro em ${__filename}:\n ${error}`)
  }
 
 
};
