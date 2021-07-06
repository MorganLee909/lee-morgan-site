const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [String],
    article: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = new mongoose.model("Blog", BlogSchema);