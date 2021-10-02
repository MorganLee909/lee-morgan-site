const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const QuestionSchema = new mongoose.Schema({
    name: String,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 15
    },
    answers: [AnswerSchema],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

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
    },
    questions: [QuestionSchema]
});

module.exports = {
    Lecture: mongoose.model("Lecture", LectureSchema),
    Question: mongoose.model("Question", QuestionSchema),
    Answer: mongoose.model("Answer", AnswerSchema)
};