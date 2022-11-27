const { Router } = require("express");
const AuthMid = require("../middleware/authmiddleware");
const userDB = require("../model/User");

const router = Router();
router.use(AuthMid);
router.post("/get-data", async (req, res) => {
    const { email } = req;
    try {
        const user = await userDB.findOne({email: email}).select({"email": 1, "university_rollno": 1, "money_due": 1});
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "something went wrong"});
    }
});

module.exports = router;