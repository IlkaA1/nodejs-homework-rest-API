const express = require("express");
const ctrl = require("../../controllers/auth/index");
const router = express.Router();
const authenticate = require("../../middlewares/index");

router.post("/register", ctrl.registerUser);
router.post("/login", ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch("/", authenticate, ctrl.subscription);
router.get("/verify/:verificationToken", ctrl.verify);
router.post("/verify", ctrl.additionalVerify);

module.exports = router;
