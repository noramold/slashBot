module.exports = {
    name: "interactionCreate",
    once: true, //only want to run once 

    async execute(interaction){

        if(!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName); // check if slash command, do we have the command 
        if(!command) return; 

        try{
            await command.execute(interaction);
            // throw new Error("Command not implemented"); // throwing error to see if it catches
        }catch(err){
            console.error(err);
            await interaction.reply({

                content: "An error occured while executing the command!", 
                ephemeral: true, // only visible to the person executing the command 
            })
        }
    
    }
}
