const { Router } = require("express");
const AuthMid = require("../middleware/authmiddleware");
const userDB = require("../model/User");
const transactionDB = require("../model/Transaction")

const router = Router();
router.use(AuthMid);
router.post("/get-data", async (req, res) => {
    const { email } = req;
    try {
        const transactions = await transactionDB.find({ email: email });
        const user = await userDB.findOne({ email: email }).select({ "email": 1, "university_rollno": 1, "money_due": 1, "name": 1, "address": 1 });
        res.json({
            success: true, user: {
                name: user.name,
                address: user.address,
                email: user.email, 
                university_rollno: user.university_rollno, 
                money_due: user.money_due, 
                transactions: transactions.length
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "something went wrong" });
    }
});

module.exports = router;