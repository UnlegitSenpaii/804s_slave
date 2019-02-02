const Commando = require('discord.js-commando');
const discord = require('discord.js');
const bot = new Commando.Client({
        commandPrefix: "$"
    });
const fs = require("fs");
const moment = require("moment");



const serverStats = {
    guildID: '529681261913178133',
    totalUsersID: '529693828798611460',
    memberCountID: '529693830312624148',
    botCountID: '529693829712969728'
};





let userData = JSON.parse(fs.readFileSync("data/userdata.json", "utf8"));


bot.registry.registerGroup('simple', 'Simple')
bot.registry.registerGroup('management', 'Management')
bot.registry.registerGroup('music', 'Music')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")


global.servers = {};//warum brauchst du das?        kannst du auch einfach auslassen im musikbot
global.lastmessageuser = 0;
global.lastmessagesend = 0;
global.links = true;
global.ads = false;
global.lastchannel = 0;
global.randomads = [
        "```please help 804 is holding me, his admins and mods as hostage and feeds them only with old dryed cum and also with outdated sources```",
        "```selly.gg/@desync```",


];
global.bannedwords = [      //das ist eine global variable weil ich noch später darauf zugreifen werden via eines commands (addbl.js)

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
        let logChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
        
        message.delete();
        author.send("`Links are currently disabled!`", {files: ["images/No_Links_Allowed.png"]});
        console.log("Deleted message from: " + message.author.username + " " + message.author + " reason: Link! \n");
        valid = false;
        if(!logChannel) return;
        logChannel.send("Deleted message from: " + message.author.username + " " + message.author + " reason: Link!");
     }
    }
    if(foundbadword)//wenn er ein blockiertes wort gefunden hatt führt er das hier aus
    {
        message.delete();
        author.send("`Please watch your language!`", {files: ["images/benice.png"]});
        console.log("Deleted message from: " + message.author.username + " " + message.author + " reason: Blacklisted word! \n");
        valid = false;
        let logChannel = message.guild.channels.find(`name`, "╒-ʟᴏɢs");
        if(!logChannel) return;
        logChannel.send("Deleted message from: " + message.author + " reason: Blacklisted word!")
    }
    if(valid)   //ich weiß ich könnte auch einfach dort wo valid = false; steht return hinschreiben, aber das währe ja sogar schlau wenn ichs mir so überlege .-.
    {
        if(ads == true)
        {
          var random = Math.floor(Math.random() * 25);
         // var random = 5
          if(random == 5)
             {
               let messagetosend = randomads[Math.floor(Math.random() * randomads.length)]
               message.channel.send(messagetosend);
            }
      }
      lastchannel = message.channel;

    }
});
//#endregion bot on message
bot.on("guildMemberAdd", function(member){
    console.log(member.username  + " ist dem Server beigetreten! ID: " + member);

    if(member.guild.id !== serverStats.guildID)
        return;

    bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

    let logChannel = member.guild.channels.find(`name`, "╒-ʟᴏɢs");
    if(!logChannel) return;

    logChannel.send(member  + " has joined the Server! ID: " + member.id)

});
bot.on("guildMemberRemove", function(member){

    if(member.guild.id !== serverStats.guildID)
        return;

        bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
        bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m=> !m.user.bot).size}`);
        bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m=>m.user.bot).size}`);

        let logChannel = member.guild.channels.find(`name`, "╒-ʟᴏɢs");
        if(!logChannel) return;
    
        logChannel.send(member  + " has left the Server! ID: " + member.id)
});


//#region bot on ready513830595160309781
bot.on('ready',function(){
    console.log("###################################################################### \n");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>Started Bot successfully!<<<<<<<<<<<<<<<<<<<<< \n");
    console.log("###################################################################### \n");
    let status = [
        "selly.gg/@desync",
        "advantage through technology"
    ];
    let onofthing = [
        "Online",
        "dnd"
    ];
    setInterval(function() {
        let status2 = status[Math.floor(Math.random() * status.length)]
        let onofthing2 = status[Math.floor(Math.random() * onofthing.length)]
        bot.user.setActivity(status2, {type: "WATCHING"});//possible: Playing, streaming, listening, watching (all caps btw)
        bot.user.setStatus(onofthing2);
        ;
    }, 10000)
});
//#endregion bot on ready
bot.login(process.env.BOT_TOKEN);//nani  where is the token you may ask, well i ate it
