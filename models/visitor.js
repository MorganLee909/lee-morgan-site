const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: new Date()
    },
    route: String,
    ip: String,
    method: String
});

module.exports = mongoose.model("visitor", VisitorSchema);