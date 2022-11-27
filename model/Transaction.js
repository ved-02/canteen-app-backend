const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    item_list: {
        type: {},
    },
    date: {
        type: date,
        default: new Date()
    }
},
    { collection: "Users" }
);

const model = mongoose.model("User", userSchema);

module.exports = model;