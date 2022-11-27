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
    name: {
        type: String
    },
    address:{
        type: String
    },
    university_rollno: {
        type: String,
        required: true
    },
    money_due: {
        type: Number,
        default: 0
    }
},
    { collection: "Users" }
);

const model = mongoose.model("User", userSchema);

module.exports = model;