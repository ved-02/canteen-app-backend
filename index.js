require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const AuthRoute = require("./routes/AuthRoute")
const TransactionRoute = require("./routes/transactionRoute");
const DueRoute = require("./routes/DueRoute");
const UserDataRoute = require("./routes/UserDataRoute");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("db connected");
});

app.use("/user", UserDataRoute);
app.use("/auth", AuthRoute);
app.use("/transaction", TransactionRoute);
app.use("/due", DueRoute);
app.get("/", (req, res)=>{
    res.json({message: "Backend API running!"});
})

app.listen(PORT, () => {
    console.log(`app running ${PORT}`)
})