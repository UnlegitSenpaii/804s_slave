const cmd = require("discord.js-commando");

class importCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "addad",
          group: "management",
          memberName: "addad",
          description: "Add a word to the ad message"
       });
    }
    async run(message, args)
    {
        if(message.member.hasPermission("ADMINISTRATOR"))
        {
            randomads.push(args)
            message.channel.send("`Successfully added " + args + " !`")
            let logChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
            if(!logChannel) return;
        
            logChannel.send(message.author + " has added a new ad: " + args + " !")
        }
        else{
            message.channel.send("`You have to have the ADMINISTRATOR rights to execute this command!`")
        }
    }

}

module.exports = importCommand;