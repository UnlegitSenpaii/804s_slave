const cmd = require("discord.js-commando");
const discord = require('discord.js');
class importCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "mute",
          group: "management",
          memberName: "mute",
          description: "Mutes a user example: mute @USERNAME!"
       });
    }
    async run(message, args)
    {
        let logChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
        if(!logChannel)return  message.channel.send("Coudn't find logchannel.");
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tomute)return logChannel.send("Coudn't find user.")
        if(!message.member.hasPermission("ADMINISTRATOR")) return logChannel.send("`You have to have the ADMINISTRATOR rights to execute this command!`");
        let muterole = message.guild.roles.find(`name`, `muted`);
        if(!muterole) {
            logChannel.send("Coundt find the muted role! Creating Muted Role...");
            try
            {
                muterole = await message.guild.createRole(
                    {
                        name: "muted",
                        color: "#000000",
                        permissions:[]
                    }
                )
                message.guild.channels.forEach(async(channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }catch(e){
                console.log(e.stack);
                logChannel.send("Creating Mutedrole failed! Please give the Bot enough Permissions to create Ranks.")
            }
        }
        //finnaly finished checking for shit now we can finnaly mute this fucker

        
        let muteEmbed = new discord.RichEmbed()
        .setDescription("~Mute~")
        .setColor("#e56b00")
        .addField("Muted User", `${tomute} with ID ${tomute.id}`)
        .addField("Muted By", `${message.author} with ID ${message.author.id}`)
        .addField("Muted In", message.channel)
        .addField("Time", message.createdAt);

        await(tomute.addRole(muterole));

        logChannel.send(muteEmbed);
    }

}

module.exports = importCommand;