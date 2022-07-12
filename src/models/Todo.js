const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    text: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
    },
    priority: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    author: String,
});

module.exports = model("Todo", todoSchema);