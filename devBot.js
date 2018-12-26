const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const asl = require('./commandsASL.js');
const config = require('./config.json');

client.login(auth.token);

client.on("message", message => {
    // Don't reply to other bots (not even yourself)
    if (message.author.bot)
        return;

    // ignore the message if it isnt meant for us
    if (message.content.indexOf(config.prefix) !== 0)
        return;

    // parse the message past the prefix
    const command = message.content.slice(1).trim().split(/ +/gi);

    // console.log(command);
    switch (command[0]) {
        case 'ping':
            message.channel.send("Pong!");
            break;
        case "blah":
            message.channel.send("Meh.");
            break;
        case "asl":
            var updatedCommand = command[1].toString().split(/\//g);
            asl.aslCommand(message, updatedCommand);
            break;
        default:
            message.channel.send("How'd you get here?");
    }
});