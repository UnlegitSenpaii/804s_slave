const cmd = require("discord.js-commando");

class importCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "ads",
          group: "management",
          memberName: "ads",
          description: "Toggles the ads!"
       });
    }
    async run(message, args)
    {
        if(message.member.hasPermission("ADMINISTRATOR"))
        {
            if(ads)
            {
                ads = false;
                message.channel.send("`You enabled the adblocker!`");
            }
            else if(!ads)   
            {
                ads = true;
                message.channel.send("`You disabled the adblocker!`");
            }
        }
        else{
            message.channel.send("`You have to have the ADMINISTRATOR rights to execute this command!`")
        }
    }

}

module.exports = importCommand;