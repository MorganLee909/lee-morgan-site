const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
    answerer: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String,
        required: true
    }
});

const QuestionSchema = mongoose.Schema({
    asker: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    content: {
        type: String,
        required: true
    },
    answers: [AnswerSchema]
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
    Question: mongoose.model("question", QuestionSchema),
    Answer: mongoose.model("answer", AnswerSchema)
};