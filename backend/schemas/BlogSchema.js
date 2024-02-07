// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define a Mongoose schema for the 'Blog' model
const blogSchema = new Schema({
  image: String,
  title: String,
  slogan: String,
  content: String,
  description: String,
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

// Create a Mongoose model for the 'Blog' schema
const BlogModel = mongoose.model("Blog", blogSchema);

// Export both models for use in other files
module.exports = BlogModel;
