

const {SlashCommandBuilder} = require("@discordjs/builders")
const redditFetch = require('reddit-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Predict your present/future")
        .addStringOption((option) =>
        option
            .setName("question")
            .setDescription("Ask the magic ball ball 🎱")
            .setRequired(true) // has to send a message 
    ),
    async execute(interaction){

        // eight = Math.floor(Math.random()*(ball.length));
        var item = ball[Math.floor(Math.random()*ball.length)];

        // console.log(item)
        interaction.reply({
            // content: interaction.options.getString("message"), 
            content: item,
            ephemeral: false, // only visible to the person executing the command 
        });
    }
};


var ball = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "You may rely on it."
]


