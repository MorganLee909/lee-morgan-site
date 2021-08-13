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
    furtherReading: [{
        text: String,
        link: String
    }],
    documents: [{
        name: String,
        link: String
    }],
    exercises: [String],
    createdDate: {
        type: Date,
        default: new Date(),
        required: true
    },
    updatedDate: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("Lecture", LectureSchema);