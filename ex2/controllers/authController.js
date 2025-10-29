const jwt = require("jsonwebtoken");
const { findUser } = require("../models/userModel");

// Secret key for JWT
const SECRET_KEY = "mysecretkey123";
const TOKEN_EXPIRY = "1h";

// Login controller
const login = (req, res) => {
  const { username, password } = req.body;

  const user = findUser(username, password);
  
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  login
};
