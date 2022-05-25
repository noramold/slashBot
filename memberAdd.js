const Discord = require("discord.js");
const { config } = require("dotenv");


/* Images */
const tdImgURL = "https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/29216298_1226565720812976_4117224987897626624_n.png?stp=dst-png&_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TUcMQW63pAcAX9Cwvm6&_nc_ht=scontent-arn2-1.xx&oh=00_AT-ditdzajHj134FehNDeMBcG9uRHalldbQjVukImyUZcw&oe=6299933B";
const rulesImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz7o_dGQwxP08uOBVOoa9eWsmof4oODcjSHw&usqp=CAU";
const infoImg  = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png";

/**
 * Main function of guilMemberAdd 
 * Calls two sub-functions 
 */
function memberAdded(member)
{
        /* Sent in set channel  */
        const newMemberEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Welcome to IFI")
        .setDescription(`${member.user} welcome here! 
        
        Be sure to check your DMs for rules and information 🤓
        
        **Fetch your class role below**
        • If you're a first year react with:    ${process.env.FIRST_AA}
        • If you're a second year react with:   ${process.env.SECOND_AA}
        • If you're a third year react with:    ${process.env.THIRD_AA}
        • If you're a fourth year react with:   ${process.env.FOURTH_AA}
        • If you're a fifth year react with:    ${process.env.FIFTH_AA}
        • If you're an alumnus year react with: ${process.env.ALUMNUS_AA}
        • If you need help please react with:   ${process.env.HELP_AA} 
        `)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

    /* Rules embed, sent to user (DM)*/
    const rulesEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Rules of IFI-Server")
        .setDescription(`
        ${member.user} be sure to get to know the rules! 

        • **Rule 1:** ${process.env.RULE_1}
        • **Rule 2:** ${process.env.RULE_2}
        • **Rule 3:** ${process.env.RULE_3}
        • **Rule 4:** ${process.env.RULE_4}
        `)
        .setImage(`${rulesImg}`)
        .setThumbnail(`${tdImgURL}`)
        .setTimestamp();

    /* Info embed, sent to user  (DM)*/
    const infoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Info about the IFI-Server")
        .setDescription(`
        ${member.user} here's some useful info for you! 
        • ${process.env.INFO_1}
        • ${process.env.INFO_2}
        • ${process.env.INFO_3}
        • ${process.env.INFO_4}
        `)
        .setImage(`${infoImg}`)
        .setThumbnail(`${tdImgURL}`)
        .setTimestamp();

    // first sends personal message to the user, the next sends in the channel 
    member.send({ embeds: [rulesEmbed]}) && member.send({ embeds: [infoEmbed]}) && member.guild.channels.cache.get(`${process.env.CHANNEL_ID}`).send({ embeds: [newMemberEmbed]}).then(async message => {
        /* Adding reactions bit by bit */
        await message.react(`${process.env.FIRST_AA}`);
        await message.react(`${process.env.SECOND_AA}`);
        await message.react(`${process.env.THIRD_AA}`);
        await message.react(`${process.env.FOURTH_AA}`);
        await message.react(`${process.env.FIFTH_AA}`);
        await message.react(`${process.env.ALUMNUS_AA}`);
        await message.react(`${process.env.HELP_AA}`);
        /* Filtering through - for switch case scenario */
        const filter = (reaction, user) => [
            `${process.env.FIRST_AA}`,`${process.env.SECOND_AA}`,
            `${process.env.THIRD_AA}`,`${process.env.FOURTH_AA}`,
            `${process.env.FIFTH_AA}`,`${process.env.ALUMNUS_AA}`, `${process.env.HELP_AA}`].includes(reaction.emoji.name) && user.id === member.id // Only mentioned person can say 'yes' or 'no'
        
        const collector = message.createReactionCollector(filter)
    
        // Fetching the guilds for years 
        let roleFirst   = member.guild.roles.cache.find(role => role.id === process.env.KULL_ONE_ID);//`${kullOneId}`);
        let roleSecond  = member.guild.roles.cache.find(role => role.id === process.env.KULL_TWO_ID);//`${kullTwoId}`);
        let roleThird   = member.guild.roles.cache.find(role => role.id === process.env.KULL_THREE_ID);//`${kullThreeId}`);
        let roleFourth  = member.guild.roles.cache.find(role => role.id === process.env.KULL_FOUR_ID);//`${kullFourId}`);
        let roleFifth   = member.guild.roles.cache.find(role => role.id === process.env.KULL_FIVE_ID);//`${kullFiveId}`);
        let roleAlumnus = member.guild.roles.cache.find(role => role.id === process.env.KULL_ALUMUS_ID);//`${kullAlumnusId}`);
        let roleHelp    = member.guild.roles.cache.find(role => role.id === process.env.HELP_ID);//`${helpId}`);
        
        /* Checking whether we have fetched the correct ID's */
        if (!roleFirst && !roleSecond && !roleThird
            && !roleFourth  && !roleFifth  && !roleAlumnus && !roleHelp) return message.channel.send(`role not found`)
        
        /*Calling fuction that grants roles  */
        collectorFunc(collector, member, message, 
            roleFirst,roleSecond, roleThird,
            roleFourth, roleFifth, roleAlumnus, roleHelp)

        
    });
 }
/**
  * 
To narrow down the size of the function 
Six-switch cases: one for each year, and one for alumni
  */
function collectorFunc(collector, member, message,
    roleFirst,roleSecond,roleThird,
    roleFourth,roleFifth,roleAlumnus, roleHelp)
{
    
    collector.on('collect', async r => {
        switch (r.emoji.name) {
            case `${process.env.FIRST_AA}`:
                console.log(`PRESSED ${process.env.FIRST_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleFirst, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.SECOND_AA}`:
                console.log(`PRESSED ${process.env.SECOND_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleSecond, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.THIRD_AA}`:
                console.log(`PRESSED ${process.env.THIRD_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleThird, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.FOURTH_AA}`:
                console.log(`PRESSED ${process.env.FOURTH_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleFourth, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.FIFTH_AA}`:
                console.log(`PRESSED ${process.env.FIFTH_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleFifth, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.ALUMNUS_AA}`:
                console.log(`PRESSED ${process.env.ALUMNUS_AA}`) // checking whether switch case works 
                ifHasRole(r, member, message,  roleAlumnus, 
                    process.env.KULL_ONE_ID, process.env.KULL_TWO_ID, process.env.KULL_THREE_ID, 
                    process.env.KULL_FOUR_ID, process.env.KULL_FIVE_ID, process.env.KULL_ALUMUS_ID); 
                collector.stop()
                break;
            case `${process.env.HELP_AA}`:
                console.log(`PRESSED ${process.env.HELP_AA}`) // checking whether switch case works 
                var sucess_embed = new Discord.MessageEmbed()
                .setDescription(`${member.user} needs help with their role: ${roleHelp}`)
                .setColor("RANDOM")
                return message.channel.send({ embeds: [sucess_embed]});
                
        }
    })
}

/**
  * To make sure people cannot fetch more roles than one  
     * GrantRole - is repeated - but yes the role we want to give 
 */
function ifHasRole(r, member, message, grantRole)
{
    if (member.roles.cache.has(`${process.env.KULL_ONE_ID}`) || member.roles.cache.has(`${process.env.KULL_TWO_ID}`)
    || member.roles.cache.has(`${process.env.KULL_THREE_ID}`) || member.roles.cache.has(`${process.env.KULL_FOUR_ID}`)
    || member.roles.cache.has(`${process.env.KULL_FIVE_ID}`) || member.roles.cache.has(`${process.env.KULL_ALUMUS_ID}`)) //if already reacted don't grant another role
    {
        console.log("blæææææ");
        r.remove();
    } else {
        // console.log("test")
        member.roles.add(grantRole);
        var melp_embed = new Discord.MessageEmbed()
        .setDescription(`Sucsessfully added role ${grantRole}`)
        .setColor("RANDOM")
        return message.channel.send({ embeds: [melp_embed]}) //.then(m => m.delete({timeout: 5000}));
    }
 
}

module.exports = {memberAdded}