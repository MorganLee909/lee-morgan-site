const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    groupTitle: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    video: String,
    description: {
        type: String,
        required: true,
    },
    documents: [{
        title: String,
        link: String
    }],
    exercises: [String]
});

module.exports = mongoose.model("lecture", LectureSchema);