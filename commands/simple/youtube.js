const commando = require('discord.js-commando');
const discord = require('discord.js');

class MyYoutubeCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name:'website',
            group:'simple',
            memberName: 'website',
            description: "Shows you the owner's webiste",
        })
    }

    async run(message, args)
    {
        var ws = new discord.RichEmbed()
        var ws = new discord.RichEmbed()
            .addField("804's website","http://8-0-4.tk", true)
            .setColor("#FF69B4")
            .setThumbnail("https://images-ext-1.discordapp.net/external/7lQmKl_5iEO2A7hkinJLv2kws7i-l2oPu5BDNtpH4KM/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/309382507550212107/e5d1c44bd83ea3f7e013b72eae3419c5.png")
            .setFooter("idk why i did this")
        message.channel.sendEmbed(ws);
        }
    }

module.exports = MyYoutubeCommand;