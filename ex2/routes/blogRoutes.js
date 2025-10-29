const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  addBlog,
  updateBlogById,
  deleteBlogById
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");

// Get all blogs
router.get("/", getBlogs);

// Get blog by ID
router.get("/:id", getBlog);

// Add new blog (protected)
router.post("/", verifyToken, addBlog);

// Update blog (protected)
router.put("/:id", verifyToken, updateBlogById);

// Delete blog (protected)
router.delete("/:id", verifyToken, deleteBlogById);

module.exports = router;
