const Comment = require("../model/Comment");
const BlogModel = require("../schemas/BlogSchema");
const recipeModel = require("../schemas/RecipeSchema");

const populateReplies = async (comment) => {
  try {
    await comment.populate("replies");
    await comment.populate({
      path: "author",
      select: "username userimage _id",
    });
    for (const reply of comment.replies) {
      await populateReplies(reply);
    }
  } catch (error) {
    console.error("Error populating replies:", error);
    throw error;
  }
};

const updateParentModel = async (parentId, commentId, Model) => {
  try {
    await Model.findByIdAndUpdate(parentId, {
      $push: { comments: commentId },
    });
  } catch (error) {
    console.error("Error updating parent model:", error);
    throw error;
  }
};

const commentController = {
  createComment: async (req, res, Model) => {
    const { parentId, author, content } = req.body;
    const newComment = new Comment({
      parentId,
      author,
      content,
    });

    try {
      const savedComment = await newComment.save();
      await updateParentModel(parentId, savedComment._id, Model);

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // ... other methods ...
};

module.exports = commentController;
