const commando = require('discord.js-commando');

class BallCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name:'8ball',
            group:'simple',
            memberName: '8ball',
            description: 'Answers your question with "Yes", "No" or "Maybe".'
        })
    }

    async run(message, args)    //warum so kompiziert?
    
    {
        var ball = Math.floor(Math.random() * 3);
        if(ball == 0)
        {
            message.channel.send("Yes");
        }
        if(ball == 1)
        {
            message.channel.send("No");
        }
        if(ball == 2)
        {
            message.channel.send("Maybe");
        }
    }
}

module.exports = BallCommand;