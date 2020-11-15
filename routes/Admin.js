const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const adminCtrl = require("../controller/admin");

router.post("/admin/login", adminCtrl.login);
router.post("/admin/signup", adminCtrl.signup);

module.exports = router;
