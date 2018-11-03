const commando = require('discord.js-commando');

class JoinChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'join',
            group:'music',
            memberName: 'join',
            description: 'Joins the voice channel that you are curently in.'
        });
    }

    async run(message, args)
    {
        if(message.member.voiceChannel)
        {
            if(!message.guild.voiceConnection)
            {
                    message.member.voiceChannel.join()
                    .then(connection =>{
                     message.channel.send("```Joined :D```");                     
                    })
            }
        }

        else
        {
            message.channel.send("```Join a Voice Channel first qt :lenny:```");
        }
    }
}

module.exports = JoinChannelCommand;