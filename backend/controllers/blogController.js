const BlogModel = require("../schemas/BlogSchema");

const blogController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await BlogModel.find().populate("user");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await BlogModel.findById(req.params.id).populate("user");
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createPost: async (req, res) => {
    const { title, author, content } = req.body;
    const newPost = new Blog({ title, author, content });

    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await BlogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await BlogModel.findByIdAndDelete(req.params.id);
      if (deletedPost) {
        res.status(200).json({ message: "Post deleted successfully" });
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = blogController;
