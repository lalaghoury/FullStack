const UserModel = require("../schemas/UserSchema");
const newsletterModel = require("../schemas/newsletterSchema");

const newsletterController = {
  subscribeToNewsletter: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).send({
          message: "Email is required for newsletter subscription.",
          success: false,
        });
      }
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).send({
          message: "Please sign up first. User not found",
          success: false,
        });
      }
      if (user.newsletter) {
        return res.status(409).send({
          message: "User already subscribed to newsletter.",
          success: false,
        });
      }
      const existingSubscription = await newsletterModel.findOne({ email });
      if (existingSubscription) {
        return res.status(409).send({
          message: "Email is already subscribed to newsletter.",
          success: false,
        });
      }

      await newsletterModel.create({ email: email });

      user.newsletter = true;
      await user.save();

      // Placeholder for send email logic
      // sendEmail(email, "Subscribed", "You've subscribed to our newsletter.");

      res.status(200).json({
        success: true,
        message: "Subscribed to newsletter successfully.",
        user: user,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  unsubscribeFromNewsletter: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.userId);
      if (!user) {
        return res.status(404).send({
          message: "Please login in first. User not found",
          success: false,
        });
      }
      if (!user.newsletter) {
        return res.status(409).send({
          message: "User is not subscribed to newsletter.",
          success: false,
        });
      }
      const existingSubscription = await newsletterModel.findOne({
        email: user.email,
      });
      if (!existingSubscription) {
        return res.status(409).send({
          message: "Email is not subscribed to newsletter.",
          success: false,
        });
      }

      user.newsletter = false;
      await user.save();
      await newsletterModel.deleteOne({ email: user.email });

      // Placeholder for send email logic
      // sendEmail(email, "Unsubscribed", "You've unsubscribed from our newsletter.");

      res.status(200).json({
        success: true,
        message: "Unsubscribed from newsletter successfully.",
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  getAllNewsletters: async (req, res) => {
    try {
      const subscribers = await newsletterModel.find();
      res.status(200).json({
        success: true,
        subscribers,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = newsletterController;
