// In-memory blog data
let blogs = [
  { id: 1, title: "My First Blog", content: "Hello world!" }
];

// Get all blogs
const getAllBlogs = () => {
  return blogs;
};

const getBlogById = (id) => {
  return blogs.find(b => b.id === parseInt(id));
};

const createBlog = (title, content) => {
  const newBlog = { 
    id: blogs.length + 1, 
    title, 
    content 
  };
  blogs.push(newBlog);
  return newBlog;
};

const updateBlog = (id, title, content) => {
  const blog = blogs.find(b => b.id === parseInt(id));
  if (!blog) return null;

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  return blog;
};

const deleteBlog = (id) => {
  const initialLength = blogs.length;
  blogs = blogs.filter(b => b.id !== parseInt(id));
  return blogs.length < initialLength; // Returns true if deleted
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
