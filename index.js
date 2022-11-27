require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRoute = require("./routes/AuthRoute")

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("db connected");
});

app.use("/auth", AuthRoute);
app.get("/", (req, res)=>{
    res.json({message: "Backend API running!"});
})

app.listen(PORT, () => {
    console.log(`app running ${PORT}`)
})