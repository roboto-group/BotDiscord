//Este arquivo vai estar lidando com as mensagens que receberemos e dando XP aos usuários
const { Client, Message } = require('discord.js');
const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const cooldowns = new Set(); //Um set é um container de valores únicos.

// vamos armazenar no cooldowns os usersId, qur ficaram armazenados por apenas 60 segundos.
function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
*/
module.exports = async (client, message) => {
  
  //Se a mensagen é do servidor ou se é de um bot ou se for um usuário em cooldown
  if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

  const xpToGive = getRandomXp(5, 15);

  //armazenando o id do autor da mensagem e o id do servidor
  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };
  
  try {
    
    //procurando no DB por um registro com dados semelhantes aos que foram armazenados na query
    const level = await Level.findOne(query);  

    //caso o match tenha ocorrido
    if (level) {
      level.xp += xpToGive;

      //Se valor de xp desse user for maior que o nivel de xp para o level que ele está então ele vai para um novo nível.
      if (level.xp > calculateLevelXp(level.level)) {
        level.xp = 0; // nº de xp é zerado
        level.level += 1; 

        message.channel.send(`${message.member} você subiu para o nível ** ${level.level} **.`)
        
      }
      
      //atualizando a informação no banco de dados
      await level.save().catch((e) => {
        console.log(`Erro o atualizar o nível do usuáro: ${e}`);
        return;
      })

      //assim que o user recebe o xp ele entra no cooldown por 60 segundos
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id)
      }, 60000);

    } else { // Se não houve match no BD criaremos um novo registro para o novo user
      //Create new level
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      })
      
      await newLevel.save();

      //assim que o user recebe o xp ele entra no cooldown por 60 segundos
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id)
      }, 60000);
    }

  } catch (error) {
    console.log(`Erro ao fornecer XP: ${error}`)
  }
    

};