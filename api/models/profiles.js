const mongoose = require('mongoose')

let profileSchema = new mongoose.Schema({
    username: String,
    macAddress: String,
    hp: Number,
    xp: Number,
    level: Number,
    statuses: [String]
})

module.exports = mongoose.model("profiles", profileSchema)