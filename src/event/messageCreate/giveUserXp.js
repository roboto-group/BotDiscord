//Este arquivo vai estar lidando com as mensagens que receberemos e dando XP aos usuários
const { Client, Message } = require('discord.js');
const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXp');


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
  //Se a mensagen é do servidor ou se é de um bot
  
  if (!message.inGuild() || message.author.bot) return;

  const xpToGive = getRandomXp(5, 15);

  //procura no DB por um campo específico
  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };

  try {

    const level = await Level.findOne(query);  

    if (level) {
      level.xp += xpToGive;


      if (level.xp > calculateLevelXp(level.level)) {
        level.xp = 0;
        level.level += 1;

        message.channel.send(`${message.member} você subiu para o nível ** ${level.level} **.`)
        
      }
      
      // atualizando a informação no banco de dados
      await level.save().catch((e) => {
        console.log(`Erro o atualizar o nível do usuáro: ${e}`);
        return;
      })

    } else {
      //Create new level
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      })
      
      await newLevel.save();
    }

    //if (!level)

  } catch (error) {
    console.log(`Erro ao fornecer XP: ${error}`)
  }
    

};