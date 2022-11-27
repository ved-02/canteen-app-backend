const { Router } = require("express");
const AuthMid = require("../middleware/authmiddleware");
const DueControllers = require("../controller/DueControllers");

const router = Router();
router.use(AuthMid);
router.post("/add_due", DueControllers.addDue);

module.exports = router;