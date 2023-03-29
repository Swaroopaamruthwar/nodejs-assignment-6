const router = require("express").Router();
const Blog = require("../models/Blog");

// Get all blogs with pagination and search
router.get("/blog", async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const limit = 5;
  const skip = (page - 1) * limit;
  const query = search ? { topic: { $regex: search, $options: "i" } } : {};

  try {
    const blogs = await Blog.find(query).skip(skip).limit(limit);
    res.json({ status: "success", result: blogs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Create a new blog
router.post("/blog", async (req, res) => {
  const { topic, description, posted_at, posted_by } = req.body;
  const newBlog = new Blog({ topic, description, posted_at, posted_by });

  try {
    const savedBlog = await newBlog.save();
    res.json({ status: "success", result: savedBlog });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// Update a blog by ID
router.put("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found" });
    }
    res.json({ status: "success", result: blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Delete a blog by ID
router.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({ status: "success", result: deletedBlog });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;
