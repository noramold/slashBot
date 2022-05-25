// // https://www.youtube.com/watch?v=mrGZAutUvGs


// const permission = require("./modPerms")

// const Discord  = require('discord.js');
// module.exports = 
// {
//     name: 'create',
//     category: 'mods',
//     description: 'creates roles',
//     run: async(client,message,args) =>
//     {
//         const member = message.member

//         if(!message.member.permissions.has(permission)) return message.reply('You do not have permissons to use this command')

//         const color = args[0] 
//         if(!color) return message.reply('What colour do you want for your role? (*!create **COLOUR** **ROLENAME** *)')

//         const roleName = args.slice(1).join(' ') 
//         if(!roleName) return message.reply(`What name do you want for your role? (*!create **COLOUR** **ROLENAME** *)`) 

//         if(message.mentions.guild.roles.cache.find(r => r.name === roleName)) return  message.reply(`Role already rexists!`)
    
//         if(roleName.length > 29) return message.reply(`Rolename too long! Should be shorter than 20 letters!`)
//         if(roleName.length < 2) return message.reply(`Rolename too short, should be longer than 2 letters!`)

//         const test_embed = new Discord.MessageEmbed()
//             // .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
//             .setTimestamp()
//             .setColor('RANDOM')
//             .setDescription(`
//             <@${member.user.id}> Wants to create role with **${roleName}** and colour **${color}**

//             React with ${process.env.YES_AA} to create role
//             React with ${process.env.NO_AA} to cancel request
//             `)

//         message.channel.send({ embeds: [test_embed]}).then(async message => {
//             /* Adding reactions bit by bit */
//             await message.react(`${process.env.YES_AA}`);
//             await message.react(`${process.env.NO_AA}`);

//             /* Filtering through - for switch case scenario */
//             const filter = (reaction, user) => [
//                 `${process.env.YES_AA}`,`${process.env.NO_AA}`].includes(reaction.emoji.name) && user.id === member.id // Only mentioned person can say 'yes' or 'no'
            
//             const collector = message.createReactionCollector(filter)
        
            
//             collector.on('collect', async r => {
//                 switch (r.emoji.name) {
//                     case `${process.env.YES_AA}`:
//                         console.log(`PRESSED ${process.env.YES_AA}`) // checking whether switch case works 
//                         member.guild.channels.cache.get(`${process.env.CHANNEL_ID}`)
//                         member.guild.roles.create({
//                             data: {
//                                 name: roleName, 
//                                 color: color, 
//                                 mentionable: false, 
//                             }
//                         })
//                         if(message.mentions.guild.roles.cache.find(r => r.name === roleName)) return  message.inlineReply(`Role already rexists!`)
//                         // var sucess_embed = new Discord.MessageEmbed()
//                         // .setDescription(`Sucsessfully created role with name **${name}** and colour **${color}**`)
//                         // .setColor("RANDOM")
//                         // return message.channel.send(sucess_embed).then(m => m.delete({timeout: 5000}));
    
//                         collector.stop()
//                         break;
//                     case `${process.env.NO_AA}`:
//                         var cancel_embed = new Discord.MessageEmbed()
//                             .setDescription("Request Cancelled")
//                             .setColor("RANDOM")
//                             return message.channel.send({embeds: [cancel_embed]}).then(m => m.delete({timeout: 5000}));
//                             collector.stop()
//                             break;
//                 }
//             })


//         });
//     }
// }




