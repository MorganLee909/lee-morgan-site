const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    asker: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    answers: [{
        answerer: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: new Date()
        }
    }]
});

module.exports = new mongoose.model("question", QuestionSchema);