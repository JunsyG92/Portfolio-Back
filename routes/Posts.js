const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const adminCtrl = require("../controller/admin");

// router.get('/:id', auth, adminCtrl.isAdmin)

module.exports = router;
