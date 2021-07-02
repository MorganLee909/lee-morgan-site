const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    documents: [String],
    exercises: [String],
    url: String,
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Lecture", LectureSchema);