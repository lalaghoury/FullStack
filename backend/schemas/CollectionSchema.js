const mongoose = require("mongoose");
const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
    },
  ],
  onModel: {
    type: String,
    required: true,
    enum: ["Category", "Recipe", "Blog"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CollectionModel = mongoose.model("Collection", collectionSchema);

module.exports = CollectionModel;
