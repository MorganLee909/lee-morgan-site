const mongoose = require("mongoose");

let isSanitary = (str)=>{
    let disallowed = ["\\", "<", ">", "$", "{", "}"];

    for(let j = 0; j < disallowed.length; j++){
        if(str.includes(disallowed[j])){
            return false;
        }
    }

    return true;
}

const CommentSchema = new mongoose.Schema({
    article: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        validate: {
            validator: isSanitary,
            message: "Your name contains restricted characters"
        },
    },
    content: {
        type: String,
        required: true,
        validate: {
            validator: isSanitary,
            message: "Your comment contains restricted characters"
        }
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("comment", CommentSchema);