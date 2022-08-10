const mongoose = require("mongoose")
const { stringify } = require("querystring")

const GuildSettingsSchema = new mongoose.Schema({
    guild_id: String, 
    welcome_id_channel: String 
});

module.exports = mongoose.model("GuildSettings", GuildSettingsSchema);