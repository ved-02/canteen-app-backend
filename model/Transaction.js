const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    item_list: {
        type: [],
    },
    date: {
        type: Date,
        default: new Date()
    }
},
    { collection: "Transactions" }
);

const model = mongoose.model("Transaction", transactionSchema);

module.exports = model;