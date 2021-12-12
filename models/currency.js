const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
    location: String,
    frontImage: String,
    backImage: String,
    type: String,
    year: Number,
    comment: String
});

module.exports = mongoose.model("currency", CurrencySchema);