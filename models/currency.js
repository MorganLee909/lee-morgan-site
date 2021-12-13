const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
    location: String,
    frontImage: String,
    backImage: String,
    type: String,
    year: Number,
    comment: String,
    name: String,
    value: Number
});

module.exports = mongoose.model("currency", CurrencySchema);