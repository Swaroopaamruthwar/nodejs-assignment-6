const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  posted_at: { type: Date, default: Date.now() },
  posted_by: { type: String, required: true },
});

//const Blog = mongooose.model("blog", blogSchema,"collection_name");
const Blog = mongoose.model("Blog", blogSchema, "blog");

module.exports = Blog;
