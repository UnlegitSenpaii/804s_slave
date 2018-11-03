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
global.servers = {};

bot.on('ready',function(){
    console.log("------------------------------------------------------------");
    console.log(">>>>>>>>>>>>>>>>>>Started Bots successfully!<<<<<<<<<<<<<<<<");
    console.log("------------------------------------------------------------");
    bot.user.setStatus('dnd');
    bot.user.setActivity('tappin nns | selly.gg/@besteconfigs', 'https://www.twitch.tv/twitch')
});

bot.login(TOKEN);