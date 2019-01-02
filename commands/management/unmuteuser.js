const cmd = require("discord.js-commando");
const discord = require('discord.js');
class importCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "unmute",
          group: "management",
          memberName: "unmute",
          description: "Unmutes a user that was muted! example: unmute @USERNAME"
       });
    }
    async run(message, args)
    {
        let logChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
        if(!logChannel)return  message.channel.send("Coudn't find logchannel.");
        let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tounmute)return logChannel.send("Coudn't find user.")
        if(!message.member.hasPermission("ADMINISTRATOR"))return logChannel.send("`You have to have the ADMINISTRATOR rights to execute this command!`");
        let muterole = message.guild.roles.find(`name`, `muted`);
        if(!muterole) return logChannel.send("Coudnt find the mutedrole!");

        let unmuteEmbed = new discord.RichEmbed()
        .setDescription("~Unmute~")
        .setColor("#e56b00")
        .addField("Muted User", `${tounmute} with ID ${tounmute.id}`)
        .addField("Unmuted By", `${message.author} with ID ${message.author.id}`)
        .addField("Unmuted In", message.channel)
        .addField("Time", message.createdAt);

        await(tounmute.removeRole(muterole));

        logChannel.send(unmuteEmbed);
    }

}

module.exports = importCommand;