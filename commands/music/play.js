
const cmd = require("discord.js-commando");
const YTDL = require("ytdl-core");

function Play(connection, message)
{
    var server = servers[message.guild.id]
    server.dispatcher = connection.playStream(YTDL(server.queue[0], 
        {
            filter:"audioonly" 
        }));
        server.queue.shift();
        server.dispatcher.on("end", function(){
            if(server.queue[0])
            {
                Play(connection, message);
            }
            else{
                connection.disconnect();
                message.channel.send("```cya :D```")
            }
        })
}


class JoinCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "play",
          group: "music",
          memberName: "play",
          description: "Joins your voice channel and plays you the music that you gave (URL not NAME)"
       });
    }
    async run(message, args)
    {
        if(message.member.voiceChannel)
        {
            if(!servers[message.guild.id])
            {
                servers[message.guild.id] = {queue: []}
            }
            if(!message.guild.voiceConnection){
                message.member.voiceChannel.join()
                .then(connection =>{
                    var server = servers[message.guild.id]
                    message.channel.send("```Joined ;D```");
                    server.queue.push(args);
                    Play(connection, message);
                })
            }
        }
        else
        {
            message.channel.send("```Join a VC first " + message.author.user + "```")
        }
    }

}

module.exports = JoinCommand;