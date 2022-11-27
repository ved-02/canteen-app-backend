const userDB = require("../model/User");
const jwt = require("jsonwebtoken");


const registerController = async (req, res) => {
    const { email, password, university_rollno, name } = req.body;
    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !password || typeof password !== "string" || !university_rollno || typeof university_rollno !== "string") {
        res.json({ success: false, error: "Incorrect Credentials" });
        return;
    }
    const checkDuplicate = await userDB.findOne({ email: email });
    if (checkDuplicate) {
        res.json({ success: false, error: "Email already exists" });
        return;
    }
    try {
        const response = await userDB.create({ email: email, password: password, university_rollno: university_rollno, money_due: 0 });
        const token = jwt.sign({ email: email }, process.env.TOKEN_KEY);
        console.log(token);
        res.status(201).json({ success: true, message: "Created", token: token });
        return;
    } catch (error) {
        res.json({ success: false, error: "Something went wrong!" });
        return;
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
        res.json({ success: false, error: "Incorrect Credentials" });
        return;
    }
    try {
        const response = await userDB.findOne({ email: email, password: password });
        if (response) {
            const token = jwt.sign({ email: email }, process.env.TOKEN_KEY);
            console.log(token);
            res.status(201).json({ success: true, message: "Loginned", token: token });
            return;
        }
        else {
            res.json({ success: false, error: "Incorrect Credentials" });
            return;
        }
    } catch (error) {
        res.json({ success: false, error: "Something went wrong!" });
        return;
    }
}

module.exports = {
    registerController,
    loginController
};