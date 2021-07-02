const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader",
        required: true
    },
    tags: [String],
    images: [String]
});

module.exports = mongoose.model("Gallery", GallerySchema);