// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog Platform API");
});

// Register routes
app.use("/", authRoutes);
app.use("/blogs", blogRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
