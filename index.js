require("dotenv").config();
const prefix  = require('./prefix.js')
const fs      = require("fs")

const {Client, Intents} = require("discord.js");
const { Collection } = require("discord.js");

const client = new Client({
    intents: [

        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});


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



client.login(process.env.TOKEN);
