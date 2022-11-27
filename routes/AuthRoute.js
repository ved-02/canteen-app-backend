const { Router } = require("express");
const AuthControllers = require("../controller/AuthControllers");

const router = Router();
router.post("/register", AuthControllers.registerController);
router.post("/login", AuthControllers.loginController);

module.exports = router;