const discord = require("discord.js-selfbot")
const fs = require("fs")
const client = new discord.Client()

require("./util/eventLoader.js")(client);
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} Adet Komut Yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen Komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.login("token")
