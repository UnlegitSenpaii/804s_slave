const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name:'leave',
            group:'music',
            memberName: 'leave',
            description: 'Leaves the voice channel that you are curently in.'
        });
    }

    async run(message, args)
    {
        if(message.guild.voiceConnection)
        {
            message.guild.voiceConnection.disconnect()
            message.channel.send("```cya ;c```")
            }
        else
        {
            message.channel.send("```I must be in a voice channel...```")
        }
    }
}

module.exports = LeaveChannelCommand;