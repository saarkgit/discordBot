const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const prefix = "!";

client.on("message", (message) => {
    // Exit and stop if not a bot command
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    }
    else if (message.content.startsWith(prefix + "foo")) {
        message.channel.send("bar!");
    }
});




/*client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:");

    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);
        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        });
    });
    let generalChannel = client.channels.get("526622403502145558");
    generalChannel.send("hello server");

});*/


client.login(auth.token);