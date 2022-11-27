const { Router } = require("express");
const AuthMid = require("../middleware/authmiddleware");
const TransactionControllers = require("../controller/TransactionControllers");

const router = Router();
router.use(AuthMid);
router.post("/get", TransactionControllers.getTransactions);
router.post("/post", TransactionControllers.postTransaction);

module.exports = router;