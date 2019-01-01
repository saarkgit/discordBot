const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const fs = require('fs');
//const asl = require('./commandsASL.js');
const config = require('./config.json');

bot.login(auth.token);

//get events from folder
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        // If the file is not a JS file, ignore it
        if (!file.endsWith(".js")) return;
        // Load the event file itself
        const cmd = require(`./events/${file}`);
        // Get just the event name from the file name
        let eventName = file.split(".")[0];

        // super-secret recipe to call events with all their proper arguments *after* the `bot` var.
        // without going into too many details, this means each event will be called with the bot argument,
        // followed by its "normal" arguments, like message, member, etc etc.
        // This line is awesome by the way. Just sayin'.
        bot.on(eventName, cmd.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

bot.commands = new Map();

//get commands from folder
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        // Load the command file itself
        let cmds = require(`./commands/${file}`);
        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        // Here we simply store the whole thing in the command map. We're not running it right now.
        bot.commands.set(commandName, cmds);
    });
});


bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

    // info about server
    //console.log(bot.guilds.get);
/*    for (let guild of bot.guilds) {
        console.log(guild[0]);  // guild id
        console.log("0 ^ | 1 v")
        console.log(guild[1]);  // ton of info
}
*/
    // Example of changing the bot's playing game to something useful. `bot.user` is what the
    //bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

/* bot.on("message", message => {
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
});*/