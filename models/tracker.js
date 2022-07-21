const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
    name: String,
    project: String,
    description: String,
    start: Date,
    end: Date,
    pauses: [{
        start: Date,
        end: Date
    }]
});

module.exports = mongoose.model("tracker", TrackerSchema);