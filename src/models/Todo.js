const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    text: {
        type: String,
        minLength: 3,
        maxLength: 255,
    },
    priority: {
        type: Number,
        min: 1,
        max: 10,
    }
});