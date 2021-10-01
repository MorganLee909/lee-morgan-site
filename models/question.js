const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    name: String,
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

module.exports = mongoose.model("Question", QuestionSchema);