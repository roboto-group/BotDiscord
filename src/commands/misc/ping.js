module.exports = {
  name: 'ping',
  description: 'responde com o ping do bot.',
  //devOnly: Boolean,
  //testOnly: Boolean,
  //options: Object[],
  //deleted: Boolean,

  callback: async (client, interaction) => {
    await interaction.deferReply();
    // coletando o timestamp da deferReply
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply({
      content: `Pong! Cliente: ${ping}ms | Websocket: ${client.ws.ping}ms.`
    })
      
  }
}