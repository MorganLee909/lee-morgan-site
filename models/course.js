const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uploader",
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbNail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("course", CourseSchema);