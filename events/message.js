const ayarlar = require('../ayarlar.json');

module.exports = message => {
  if(message.guild.id !== ayarlar.sunucu) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let client = message.client;
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    
  } else if (client.aliases.has(command)) {
    
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  if (cmd) {
    cmd.run(client, message, params);
  }
};
