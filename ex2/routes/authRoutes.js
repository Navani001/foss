const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// Login route – generate JWT
router.post("/login", login);

module.exports = router;
