

const {SlashCommandBuilder} = require("@discordjs/builders")
const redditFetch = require('reddit-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Programmer humour")
        .addStringOption((option) =>
        option
            .setName("message")
            .setDescription("Select category: hot/new/top")
            .setRequired(true) // has to send a message 
    ),
    async execute(interaction){

        if(interaction.options.getString("message").toLowerCase() === "new"){

            redditFetch({

                subreddit: 'ProgrammerHumor/',
                sort: 'new', 
                allowNSFW: true,
                allowModPost: true, 
                allowCrossPost: true, 
            
            }).then(post => {
                // var embed = new Discord.MessageEmbed()
                // .setURL(`${post.url}`)
                // .setDescription("A meme for you")
                // message.ch*annel.send(`${post.url}`);
                interaction.reply({
                    // content: interaction.options.getString("message"), 
                    content: `${post.url}`,
                    ephemeral: false, // only visible to the person executing the command 
                });
            });
        }
        else if(interaction.options.getString("message").toLowerCase() === "top"){

            redditFetch({

                subreddit: 'ProgrammerHumor/',
                sort: 'top', 
                allowNSFW: true,
                allowModPost: true, 
                allowCrossPost: true, 
            
            }).then(post => {
                // var embed = new Discord.MessageEmbed()
                // .setURL(`${post.url}`)
                // .setDescription("A meme for you")
                // message.ch*annel.send(`${post.url}`);
                interaction.reply({
                    // content: interaction.options.getString("message"), 
                    content: `${post.url}`,
                    ephemeral: false, // only visible to the person executing the command 
                });
            });
        }
        else if(interaction.options.getString("message").toLowerCase() === "hot"){

            redditFetch({

                subreddit: 'ProgrammerHumor/',
                sort: 'hot', 
                allowNSFW: true,
                allowModPost: true, 
                allowCrossPost: true, 
            
            }).then(post => {
                // var embed = new Discord.MessageEmbed()
                // .setURL(`${post.url}`)
                // .setDescription("A meme for you")
                // message.ch*annel.send(`${post.url}`);
                interaction.reply({
                    // content: interaction.options.getString("message"), 
                    content: `${post.url}`,
                    ephemeral: false, // only visible to the person executing the command 
                });
            });
        }
        else{
            interaction.reply({
                // content: interaction.options.getString("message"), 
                content: "You have to use 'hot', 'new' or 'top'",
                ephemeral: false, // only visible to the person executing the command 
            });
        }


        

    },
};

