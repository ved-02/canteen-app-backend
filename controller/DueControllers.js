const userDB = require("../model/User");

const addDue = async (req, res) => {
    const { email } = req;
    const { amount } = req.body;
    try {
        const user = await userDB.findOne({ email: email });
        if (user.money_due + amount >= 500) {
            res.json({ success: false, message: "Due amount exceeding 500" });
            return;
        }
        else {
            user.money_due += amount;
            await user.save();
            res.json({ success: true, message: "updated" });
        }
    } catch (error) {
        res.json({ success: false, message: "something went wrong" });
    }
}

module.exports = { addDue };