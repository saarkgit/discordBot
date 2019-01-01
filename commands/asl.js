exports.run = (client, message, args) => {
    let newArgs = args.toString().split(/\//g);
    let [age, sex, ...location] = newArgs;
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
        return message.channel.send(`Hello <@${message.author.id}>, I see you're a ${age} year old ${sex} from ${updatedLocation}. Wanna smash?`);
    else
        return message.channel.send(`Hello <@${message.author.id}>, I see you're a ${age} year old ${sex} from ${updatedLocation}. It's very nice to meet you!`);
}