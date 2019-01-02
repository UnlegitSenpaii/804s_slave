const cmd = require("discord.js-commando");
const discord = require('discord.js');
class BanCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "ban",
          group: "management",
          memberName: "ban",
          description: "Bans a user! example: ban @USERNAME [REASON]"
       });
    }
    async run(message, args)
    {
       
        let target = message.guild.member(message.mentions.users.first());
        if(!target){
            message.channel.send("You have to mention a user!");
            return;
        }
        if(!message.member.hasPermission("BAN_MEMBERS"))
        {
            message.channel.send("Not enough Permissions!");
            return;
        }
        if(target == message.author)
        {
            message.channel.send("You can not ban yourself!");
            return;
        }
        if(target.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!")
        let banreasonpre = args.split(' ');
        let banreason = banreasonpre.slice(1).join(' ');

        message.guild.member(target).ban(banreason);
        
        let banEmbed = new discord.RichEmbed()
            .setDescription("~Ban~")
            .setColor("#bc0000")
            .addField("Banned User", `${target.username} with ID ${target}`)
            .addField("Banned By", `${message.author} with ID ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", banreason);

        console.log("Banned " + target + " with reason: " + banreason);

        let banChannel = message.guild.channels.find(`name`, "botlogs");
        if(!banChannel) return message.channel.send("Cant find log channel!")

        banChannel.send(banEmbed);
    }

}

module.exports = BanCommand;
