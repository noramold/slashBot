//https://www.codegrepper.com/code-examples/javascript/discord.js+create+channel

const permission = require("./modPerms")
const Discord  = require('discord.js');
module.exports = 
{
    name: 'channel',
    category: 'mods',
    description: 'creates roles',
    run: async(client,message,args) =>
    {
        const member = message.member

        if(!message.member.hasPermission(permission)) return message.send('You do not have permissons to use this command')

        // Requesting category ID 
        const category_id = args[0] 
        if(!category_id) return message.send('Copy the ID of the category you want it under')

        // channel name 
        const greet_name = args.slice(1).join(' ') 
        if(!greet_name) return message.send(`What name do you want for your channel? (*!channel **categorylID** **channel name**)`) 

        //Checking whether the channel exists 
        // if(message.mentions.guild.channels.cache.find(r => r.greet_name === greet_name)) return  message.send(`Channel already rexists!`)
        
        // Not too long or too short channel names 
        if(greet_name.length > 15) return message.send(`Channel name too long! Should be shorter than 20 letters!`)
        if(greet_name.length < 2) return message.send(`Channel name too short! should be longer than 2 letters!`)

        // Sending embed to confirm or deny creation 
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            <@${member.user.id}> Wants to set greeting channel too **${greet_name}**

            React with ✅ to create channel **${greet_name}**
            React with ❌ to cancel request
            `)
            message.channel.send(embed).then(message => {
                message.react('✅') 
                message.react('❌') 

                const filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && user.id === member.id // Only mentioned person can say 'yes' or 'no'
                const collector = message.createReactionCollector(filter)


                collector.on('collect', async r => {
                    switch (r.emoji.name) {
                        case '✅':
                            try{

                                // Creating channel within the category, fetching the id, to export to welcome channel 
                                const channel = await message.guild.channels.create(greet_name,{
                                    type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
                                    parent: category_id,
                                    permissionOverwrites: [
                                        {
                                            id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                                        }
                                    ],
                                })  
                                // Storing the id, and logging it to check 
                                var channelId = channel.id;
                                console.log(channelId);
                                module.exports = channelId; // exporting to import in welcome 
                            }catch(e){
                                console.error(e);
                            }
                            

                            // sending embed 
                            var sucess_embed = new Discord.MessageEmbed()
                            .setDescription(`Sucsessfully created role with name **${greet_name}**`)
                            .setColor("RANDOM")
                            return message.channel.send(sucess_embed).then(m => m.delete({timeout: 5000}));
                            collector.stop()
                            break;
                        case '❌':
                            var cancel_embed = new Discord.MessageEmbed()
                            .setDescription("Request Cancelled")
                            .setColor("RANDOM")
                            return message.channel.send(cancel_embed).then(m => m.delete({timeout: 5000}));
                            collector.stop()
                            break;
                    }
                })
            })
    }
}

// module.exports const channelName = greet_name;

// export const channel_name = greet_name;
var permissons = [
    "MANAGE_ROLES", 
    "MANAGE_CHANNELS",
]