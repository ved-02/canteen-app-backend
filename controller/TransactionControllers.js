const transactionDB = require("../model/Transaction");

const getTransactions = async (req, res) => {
    const { email } = req;
    try {
        const response = await transactionDB.find({ email: email });
        res.json({ success: true, transaction: response });
    } catch (error) {
        res.json({ success: false, error: "something went wrong" });
    }
}
const postTransaction = async (req, res) => {
    const { email } = req;
    const { item_list } = req.body;
    if (!item_list || item_list.length === 0) {
        res.json({ success: false, error: "Send correct Item_list" });
        return;
    }
    try {
        const response = await transactionDB.create({ email: email, item_list: item_list, date: new Date() });
        res.json({ success: true });
        return;
    } catch (error) {
        // console.log(error);
        res.json({ success: false, error: "something went wrong" });
    }
}
module.exports = { getTransactions, postTransaction };