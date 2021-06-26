const mongoose = require("mongoose");

const UploaderSchema = new mongoose.Schema({
    name: String,
    password: String
});

module.exports = mongoose.model("uploader", UploaderSchema);