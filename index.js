const Commando = require('discord.js-commando');
const discord = require('discord.js');
const bot = new Commando.Client({
        commandPrefix: "$"
    });
const TOKEN = 'UR MOM IS FUCKING GAY'// no u

bot.registry.registerGroup('simple', 'Simple')
bot.registry.registerGroup('music', 'Music')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")


global.servers = {};//warum brauchst du das?        kannst du auch einfach auslassen im musikbot

global.lastmessageuser = 0;
global.lastmessagesend = 0;


bot.on("message", function(message){

    const author =  message.author();// wehe du machst meinen code kapput @804 meins kode > deins kode xoxo

    if(bot.user == author)
    {return;}



});




bot.on('ready',function(){
    console.log("------------------------------------------------------------");
    console.log(">>>>>>>>>>>>>>>>>>Started Bots successfully!<<<<<<<<<<<<<<<<");
    console.log("------------------------------------------------------------");
    bot.user.setStatus('dnd');
    bot.user.setActivity('tappin nns | selly.gg/@besteconfigs', 'https://www.twitch.tv/twitch')
});

bot.login(TOKEN);