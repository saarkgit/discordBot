const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const asl = require('./commandsASL.js');
const config = require('./config.json');

client.login(auth.token);

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

    // info about server
    //console.log(client.guilds.get);
/*    for (let guild of client.guilds) {
        console.log(guild[0]);  // guild id
        console.log("0 ^ | 1 v")
        console.log(guild[1]);  // ton of info
}
*/
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    //client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

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