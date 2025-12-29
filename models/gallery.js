const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [String],
    images: [String],
    location: {
        type: {type: String},
        coordinates: [],
    }
});
GallerySchema.index({location: "2dsphere"});

module.exports = mongoose.model("Gallery", GallerySchema);
