const cmd = require("discord.js-commando");
const discord = require('discord.js');
class KickCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "kick",
          group: "management",
          memberName: "kick",
          description: "Kicks a user! example: kick @USERNAME [REASON]"
       });
    }
    async run(message, args)
    {
       
        let target = message.guild.member(message.mentions.users.first());
        if(!target){
            message.channel.send("You have to mention a user!");
            return;
        }
        if(!message.member.hasPermission("KICK_MEMBERS"))
        {
            message.channel.send("Not enough Permissions!");
            return;
        }
        if(target == message.author)
        {
            message.channel.send("You can not kick yourself!");
            return;
        }
        if(target.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!")
        let kickreasonpre = args.split(' ');
        let kickreason = kickreasonpre.slice(1).join(' ');
        message.guild.member(target).kick(kickreason);
        let kickEmbed = new discord.RichEmbed()
            .setDescription("~Kick~")
            .setColor("#e56b00")
            .addField("Kicked User", `${target} with ID ${target.id}`)
            .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kickreason);

        console.log("Kicked " + target + " with reason: " + kickreason);

        let kickChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
        if(!kickChannel) return message.channel.send("Cant find log channel!")

        kickChannel.send(kickEmbed);

    }

}

module.exports = KickCommand;