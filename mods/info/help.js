
const prefix  = require('../../prefix.js')

const Discord  = require('discord.js');
module.exports = 
{
    name: 'help',
    category: 'info',
    description: 'all the commands',
    run: async(client,message,args) =>
    {
        
        if(!message.member.permissions.has("MANAGE_ROLES"))
        {
            var faulty_embed = new Discord.MessageEmbed()
            .setDescription("You don't have permission to use this command!")
            .setColor("RANDOM")
            
            // args[0].then(m => m.delete({timeout: 2500}));
            return message.channel.send({ embeds: [faulty_embed] }).then(m => m.delete({timeout: 5000})) && message.author.send("You don't have permission. Try begging the mods for the moderation role");
        }
        // var embed = new Discord.MessageEmbed()
            // .setTitle("Commands")
            // .setAuthor("The TD-Bot")
            // .setDescription(help)
            // .setThumbnail("https://s3.eu-north-1.amazonaws.com/samskipnaden/foreninger/Troms%C3%B8studentenes-dataforeningTD.png")
            // .setColor("#414084")
        message.channel.send({ embeds: [help] });
    }
}

const help = new Discord.MessageEmbed()
    .setTitle('TD-Bot helper list')
    .setThumbnail("https://s3.eu-north-1.amazonaws.com/samskipnaden/foreninger/Troms%C3%B8studentenes-dataforeningTD.png")
    .setColor("RANDOM")

    //.setDescription('My prefix is: ' + `${prefix}`)
    .addFields(
        { name: 'Create roles', value:  '`' + `${prefix}` + 'create colour rolename' + '`', inline: true},
        { name: 'Pings the bot',  value: '`' + `${prefix}` + 'ping' + '`', inline: false},
        { name: 'Creates channels',  value: '`' + `${prefix}` + 'channel categoryID channel-name' + '`', inline: false},
    )
    // .addFields(
