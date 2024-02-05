const { Schema, model } = require('mongoose');

const welcomeChannelSchema = new Schema({
    guildID: {
        type: String,
    }
})