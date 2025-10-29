const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require("../models/blogModel");

// Get all blogs
const getBlogs = (req, res) => {
  const blogs = getAllBlogs();
  res.json(blogs);
};

// Get blog by ID
const getBlog = (req, res) => {
  const blog = getBlogById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
};

// Add new blog
const addBlog = (req, res) => {
  const { title, content } = req.body;
  const newBlog = createBlog(title, content);
  res.json({ message: "Blog added successfully", blog: newBlog });
};

// Update blog
const updateBlogById = (req, res) => {
  const { title, content } = req.body;
  const blog = updateBlog(req.params.id, title, content);
  
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  
  res.json({ message: "Blog updated", blog });
};

// Delete blog
const deleteBlogById = (req, res) => {
  const deleted = deleteBlog(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ message: "Blog not found" });
  }
  
  res.json({ message: "Blog deleted successfully" });
};

module.exports = {
  getBlogs,
  getBlog,
  addBlog,
  updateBlogById,
  deleteBlogById
};
