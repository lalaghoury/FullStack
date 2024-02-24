const CollectionModel = require("../models/collection");

const collectionController = {
  // Create a new collection
  createCollection: async (req, res) => {
    try {
      const { title, description, items } = req.body;
      const newCollection = new CollectionModel({
        title,
        description,
        items, // This assumes 'items' is an array of ObjectIds referencing other models
        createdBy: req.user.userId,
      });

      const savedCollection = await newCollection.save();
      res.status(201).json({
        data: savedCollection,
        message: "Collection created successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all collections
  getAllCollections: async (req, res) => {
    try {
      const collections = await CollectionModel.find().populate("items");
      res.status(200).json(collections);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single collection by ID
  getCollectionById: async (req, res) => {
    try {
      const collection = await CollectionModel.findById(req.params.id).populate(
        "items"
      );
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a collection by ID
  updateCollection: async (req, res) => {
    try {
      const { title, description, items } = req.body;
      const collection = await CollectionModel.findByIdAndUpdate(
        req.params.id,
        { title, description, items },
        { new: true }
      );
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.status(200).json({
        data: collection,
        message: "Collection updated successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a collection by ID
  deleteCollection: async (req, res) => {
    try {
      const collection = await CollectionModel.findByIdAndRemove(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.status(200).json({ message: "Collection deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = collectionController;
