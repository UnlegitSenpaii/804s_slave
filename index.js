const Commando = require('discord.js-commando');
const discord = require('discord.js');
const bot = new Commando.Client({
        commandPrefix: "$"
    });
const TOKEN = 'UR MOM IS FUCKING GAY'// no u
const fs = require("fs");
const moment = require("moment");

let userData = JSON.parse(fs.readFileSync("data/userdata.json", "utf8"));


bot.registry.registerGroup('simple', 'Simple')
bot.registry.registerGroup('management', 'Management')
bot.registry.registerGroup('music', 'Music')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")


global.servers = {};//warum brauchst du das?        kannst du auch einfach auslassen im musikbot
global.lastmessageuser = 0;
global.lastmessagesend = 0;
global.bannedwords = [      //das ist eine global variable weil ich noch später darauf zugreifen werden via eines commands
        "nigger",

];


bot.on("message", function(message){
    const author =  message.author;// wehe du machst meinen code kapput @804 meins kode > deins kode xoxo
    if(bot.user == author)
    {return;}
    var foundbadword = false;

    for(var i in bannedwords)   //hier sucht der bot nach den blockierten wörtern
    {
        if(message.content.toLowerCase().includes(bannedwords[i].toLowerCase()))
            foundbadword = true;
    }
    
    if(foundbadword)//wenn er ein blockiertes wort gefunden hatt führt er das hier aus
    {
        message.delete();
        author.send("`Please watch your language!`");
    }

});


bot.on('ready',function(){
    console.log("######################################################################");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>Started Bots successfully!<<<<<<<<<<<<<<<<<<<<<");
    console.log("######################################################################");
    bot.user.setStatus('dnd');
    let status = [
        "tappin nns | selly.gg/@besteconfigs",
        "http://hvh.academy/",
        "advantage through technology"
    ];
    setInterval(function() {
        let status2 = status[Math.floor(Math.random() * status.length)]
        bot.user.setActivity(status2);
    }, 10000)
    bot.user.setActivity('tappin nns | selly.gg/@besteconfigs', 'https://www.twitch.tv/twitch')
});

bot.login("");