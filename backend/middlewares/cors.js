const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: "https://frontend-moy6x4t1n-aasil-ghourys-projects.vercel.app",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};

module.exports = useCors;
