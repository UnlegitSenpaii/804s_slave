const cmd = require("discord.js-commando");
const discord = require('discord.js');
const ms = require("ms");

class muteCommand extends cmd.Command
{
    constructor(client)
    {
        super(client,{

          name: "tempmute",
          group: "management",
          memberName: "tempmute",
          description: "TEMPMUTE IS UNDER CONSTRUCTION||Temporary mutes a user example: tempmute @USERNAME TIME"
       });
    }
    async run(message, args)
    {
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tomute)
        return message.channel.send("Coudn't find user.")
        if(tomute.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("Coudn't mute user!")
        console.log("done for checking missmatches");
        let muterole = message.guild.roles.find(`name`, `muted`);
        if(!muterole) {
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

            }
        }
        console.log("created role");
        let mutetime = args[1];
        if(!mutetime) return message.channel.send("You have to provide me with a mute time!");
        console.log("mutetimecheck");
        console.log("mutetime : " + mutetime);
        await(tomute.addRole(muterole));
        console.log("added role");

        let muteEmbed = new discord.RichEmbed()
        .setDescription("~Mute~")
        .setColor("#e56b00")
        .addField("Muted User", `${tomute.username} with ID ${tomute}`)
        .addField("Muted By", `${message.author} with ID ${message.author.id}`)
        .addField("Muted In", message.channel)
        .addField("Muted for", ms(ms(mutetime)))
        .addField("Time", message.createdAt);

        let logChannel = message.guild.channels.find(`name`, "botlogs");

         console.log("sending message");
         logChannel.send(muteEmbed)
         .catch(console.error);;
         console.log("send message");



        setTimeout(function(){
            tomute.removeRole(muterole);
            tomute.send("You have been unmuted!");
            console.log("unmuted target");
            logChannel.send(tomute + " has been unmuted!");
        }, ms(mutetime));



        console.log("finished tempmute.js");
    }
    
}

module.exports = muteCommand;