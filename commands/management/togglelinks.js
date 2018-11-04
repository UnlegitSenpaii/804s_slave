const cmd = require("discord.js-commando");

class importCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "links",
          group: "management",
          memberName: "links",
          description: "Toggles links on/off"
       });
    }
    async run(message, args)
    {
        if(message.member.hasPermission("ADMINISTRATOR"))
        {
            if(links)
            {
            links = false;
            message.channel.send("`Successfully set links to " + links + " !`")
            }
            else if(!links)
            {
            links = true;
            message.channel.send("`Successfully set links to " + links + " !`")
            }

        }
        else{
            message.channel.send("`You have to have the ADMINISTRATOR rights to execute this command!`")
        }
    }

}

module.exports = importCommand;