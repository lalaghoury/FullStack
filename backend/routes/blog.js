const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Get all blog posts
router.get("/", blogController.getAllPosts);

// Get a single blog post by id
router.get("/:id", blogController.getPostById);

// Create a new blog post
router.post("/", blogController.createPost);

// Update a blog post by id
router.put("/:id", blogController.updatePost);

// Delete a blog post by id
router.delete("/:id", blogController.deletePost);

module.exports = router;
