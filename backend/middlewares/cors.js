const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: "https://frontend-two-red-62.vercel.app",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};

module.exports = useCors;
