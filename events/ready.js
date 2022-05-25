// ready event

const {REST}  = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true, //only want to run once 

    execute(client, commands){

        console.log(`${client.user.username} is now online!`);
        // client.user.setActivity(`${prefix}`+"help", { type: "PLAYING" });
        client.user.setActivity(process.env.PLAYING_MSG, { type: "PLAYING" }); // just some fun stuff 
    
        const CLIENT_ID = client.user.id; // for slash commands 
    
        const rest = new REST({
            version: "9", //see above 
        }).setToken(process.env.TOKEN);
    
        (async () =>{
            try{
                if(process.env.ENV === "production"){
                    await rest.put(Routes.applicationCommands(CLIENT_ID),{
                        body: commands
                    });
                    console.log("Commands successfully registered - globally")
                }
                else{
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),{
                        body: commands
                    });
                    console.log("Commands successfully registered - locally")
                }
            } catch(err){
                if(err) console.error(err);
            }
        })();
    }
}
  