const commando = require('discord.js-commando');

class MadCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name:'mad',
            group:'simple',
            memberName: 'mad',
            description: 'Tags Everyone.'
        })
    }

    async run(message, args)
    {
    
            message.channel.send("http://i0.kym-cdn.com/photos/images/original/001/256/183/9d5.png");
            message.channel.send("@everyone `Mad?`")
        
    }
}

module.exports = MadCommand;


