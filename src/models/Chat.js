const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true},
        username: { type: String, unique: true},
        avatar: { type: String },
        alias: { type: String },
        age: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);