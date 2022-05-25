require("dotenv").config();
const prefix  = require('./prefix.js')
const fs      = require("fs")

const {Client, Intents} = require("discord.js");
const { Collection } = require("discord.js");
const Discord = require("discord.js");
const {memberAdded} = require("./memberAdd")




const client = new Client({
    disableEveryone: true,
    intents: [

        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS 

    ]
})



/*
* Command files below
 */
//  Only looking for .js-files 
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];// nothing added yet 

client.commands = new Collection();

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}


/*
* Event files below
*/

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for(const file of eventFiles)
{
    const event = require(`./events/${file}`);

    if(event.once){ //ready function 
        client.once(event.name, (...args) => event.execute(...args, commands))
    }
    else{ // other
        client.on(event.name, (...args) => event.execute(...args, commands))
    }
}


// Collections
client.mods = new Collection();
client.aliases  = new Collection();



// Run the mod-command loader
["mod"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("guildMemberAdd", async member => {
    console.log(member.user)
    
    memberAdded(member);
    
});


client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let mention = message.mentions.users.first();

    // Get the command
    let command = client.mods.get(cmd);

    if (command) 
    {
        // Checking if the bot has the right permissons before handling the command 
        if(!message.guild.me.permissions.has(bot_permissons))
        {
            // console.log("Testing")
            var faulty_embed = new Discord.MessageEmbed()
            .setTitle("I don't have permissons 😥")
            .setDescription(`I right permissons!
            
            I should be able to manage roles and manage channels and manage members!!`)
            .setColor("RANDOM")
            
            return message.channel.send(faulty_embed).then(m => m.delete({timeout: 5000})) && message.author.send("Go into the settings server and grant the bot permissons ");
        }
        command.run(client, message, args,mention);
    }
});



client.login(process.env.TOKEN);


const bot_permissons = [
    "ADD_REACTIONS",
    "MANAGE_ROLES", 
    "MANAGE_CHANNELS", 
    "MANAGE_GUILD", 
    "SEND_MESSAGE",
    "VIEW_GUILD_INSIGHTS",
];
