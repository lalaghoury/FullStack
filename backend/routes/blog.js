const express = require("express");
const router = express.Router();

const BlogModel = require("../schemas/BlogSchema");

// Route to get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("user").populate("category");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a single blog by ID
router.get("/:blogID", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.blogID)
      .populate("user")
      .populate("category");
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = await BlogModel.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to update an existing blog by ID
router.put("/:blogID", async (req, res) => {
  const { blogID } = req.params;
  const { title, slogan, content, description, category, image, user } =
    req.body;

  if (!title || !content || !category) {
    return res.status(400).send("Missing required blog fields");
  }

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogID,
      { title, slogan, content, description, category, image, user },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }

    return res.status(200).json(updatedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
});

// Route to delete a blog by ID
router.delete("/:blogID", async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.blogID);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.status(200).send("Blog deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
