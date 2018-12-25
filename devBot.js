const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const prefix = "!";

client.on("message", message => {
    // Don't reply to other bots (not even yourself)
    if (message.author.bot)
        return;

    // ignore the message if it isnt meant for us
    if (message.content.indexOf(prefix) !== 0)
        return;

    // parse the message past the prefix
    const command = message.content.slice(1).trim().split(/ +/gi);

    // const command = args.shift().toLowerCase(); // the regex above should do the same thing
    // console.log(command);
    switch (command[0]) {
        case 'ping':
            message.channel.send("Pong!");
            break;
        case "blah":
            message.channel.send("Meh.");
            break;
        case "asl":
            let [commandName, age, sex, ...location] = command;
            switch (sex) {
                case 'm':
                    sex = 'male';
                    break;
                case 'f':
                    sex = 'female';
                    break;
            }
            var updatedLocation = location.toString().replace(/,/g, " ");
            if (age >= 18)
                message.channel.send(`Hello <@${message.author.id}>, I see you're a ${age} year old ${sex} from ${updatedLocation}. Wanna smash?`);
            else 
                message.channel.send(`Hello <@${message.author.id}>, I see you're a ${age} year old ${sex} from ${updatedLocation}. It's very nice to meet you!`);
            break;
        default:
            message.channel.send("How'd you get here?");
    }
});



client.login(auth.token);