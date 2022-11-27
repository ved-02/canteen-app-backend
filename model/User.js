const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    university_rollno: {
        type: String,
        required: true
    },
    money_spent: {
        type: Number,
        default: 0
    }
},
    { collection: "Users" }
);

const model = mongoose.model("User", userSchema);

module.exports = model;