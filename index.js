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
global.links = false;
global.ads = true;
global.randomads = [
        "```please help p. is holding his admins and mods as hostage and feeds them only with old dryed cum```",

];
global.bannedwords = [      //das ist eine global variable weil ich noch später darauf zugreifen werden via eines commands (addbl.js)
        "nigger",
];

//#region bot on message
bot.on("message", function(message){
    const author =  message.author;// wehe du machst meinen code kapput @804 meins kode > deins kode xoxo
    if(bot.user == author)
    {return;}
    var foundbadword = false;
    var valid = true;
    for(var i in bannedwords)   //hier sucht der bot nach den blockierten wörtern
    {
        if(message.content.toLowerCase().includes(bannedwords[i].toLowerCase()))
            foundbadword = true;
    }
    if(!links)//eigentlich selbsterklärend wenn du dich mit globals auskennst und mit bools
    {
      if(message.content.toLowerCase().includes("http"))
     {
        message.delete();
        author.send("`Links are currently disabled!`");
        console.log("Deleted message from: " + message.author.username + " " + message.author + " reason: Link! \n");
        valid = false;
     }
    }
    if(foundbadword)//wenn er ein blockiertes wort gefunden hatt führt er das hier aus
    {
        message.delete();
        author.send("`Please watch your language!`");
        console.log("Deleted message from: " + message.author.username + " " + message.author + " reason: Blacklisted word! \n");
        valid = false;
    }
    if(valid)   //ich weiß ich könnte auch einfach dort wo valid = false; steht return hinschreiben, aber das währe ja sogar schlau wenn ichs mir so überlege .-.
    {
        var random = Math.floor(Math.random() * 15);
      //  var random = 5
        if(random == 5)
        {
            let messagetosend = randomads[Math.floor(Math.random() * randomads.length)]
            message.channel.send(messagetosend);
        }


    }

});
//#endregion bot on message

//#region bot on ready
bot.on('ready',function(){
    console.log("###################################################################### \n");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>Started Bot successfully!<<<<<<<<<<<<<<<<<<<<< \n");
    console.log("###################################################################### \n");
    bot.user.setStatus('dnd');
    let status = [
        "tappin nns",
        "http://hvh.academy/",
        "advantage through technology"
    ];
    setInterval(function() {
        let status2 = status[Math.floor(Math.random() * status.length)]
        bot.user.setActivity(status2);
    }, 10000)
    bot.user.setActivity('hvh.academy', 'https://www.twitch.tv/twitch')
});
//#endregion bot on ready

bot.login("");//