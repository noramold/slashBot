const Discord  = require('discord.js');
/*
Ids 
*/
const kullId     = "787996571668971520"; //id of role to grant
const modId      = "787996571668971520"; // id for mods - for tagging and alerting 
const channelId  = "970788413932454008"; //id of channel to send welcome messages
/*
Other important stuff  
*/
const whatClass = "2022"; // change this for each year 
const yesAA     = "😎"; // yes
const noAA      = "😬"; // no

/* Images */
const tdImgURL   = "https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/29216298_1226565720812976_4117224987897626624_n.png?stp=dst-png&_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TUcMQW63pAcAX9Cwvm6&_nc_ht=scontent-arn2-1.xx&oh=00_AT-ditdzajHj134FehNDeMBcG9uRHalldbQjVukImyUZcw&oe=6299933B";
module.exports = {
    name: "guildMemberAdd",

    async execute(member, client){
        // fetching channel id 970788413932454008s
        // member.guild.channels.cache.get("970788413932454008").send("testing")

        // console.log(member.user.avatar)
        // console.log(member)

        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Welcome to IFI")
            .setDescription(`${member.user} welcome here! 
            
            Check your dms for the rules 🤓
            
            **Fetch your class role below**
            • If you're class of ${whatClass} react with  ${yesAA}
            • If not press ${noAA}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        const rulesEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Rules of IFI-Server")
            .setDescription(`
            ${member.user} be sure to get to know the rules! 

            • **Rule 1:** askdlasdølkasød
            • **Rule 2:** alksdølaksdøk
            • **Rule 3:** alksdølaksdøk
            • **Rule 4:** alksdølaksdøk
            `)
            .setImage(`${tdImgURL}`)
            .setTimestamp();

            // first sends personal message to the user, the next sends in the channel 
            member.send({embeds: [rulesEmbed]}) && member.guild.channels.cache.get(`${channelId}`).send({embeds: [newMemberEmbed]}).then(message => {
            message.react(`${yesAA}`); 
            message.react(`${noAA}`);
        })

        client.on("messageReactionAdd", async (reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
        });
        // member.guild.channels.cache.get("970788413932454008").send({embeds: [newMemberEmbed]})
    
    }
}


// const filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && user.id === member.id // Only mentioned person can say 'yes' or 'no'
// const collector = message.createReactionCollector(filter)

// collector.on('collect', async r => {
//     switch (r.emoji.name) {
//         case '✅':
//             // Looking for the role and adding it to the user 
//             var roleToGrant = member.guild.roles.cache.find(role => role.id === `${kullId}`);
//             member.roles.add(roleToGrant);
//             console.log(roleToGrant);
//             console.log("PRESSED ✅")
//             // alerting the user that a role has been added 
//             var sucess_embed = new Discord.MessageEmbed()
//             .setDescription(`Sucsessfully added role <@&${kullId}>`)
//             .setColor("RANDOM")
//             return message.channel.send(sucess_embed).then(m => m.delete({timeout: 5000}));
//             collector.stop()
//             break;
//         case '❌':
//             console.log("PRESSED ❌")
//             var cancel_embed = new Discord.MessageEmbed()
//             .setDescription(`<@&${modId}>, ${member} is not a part of <@&${kullId}>, and need to be granted another role`)
//             .setColor("RANDOM")
//             return message.channel.send(cancel_embed);
//             collector.stop()
//             break;
//     }
// })