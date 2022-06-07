const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        phone: { type: Number, unique: true, required: true },
        avatar: { type: String },
        address: { type: String, required: true, unique: true },
        age: { type: Number, required: true},
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);