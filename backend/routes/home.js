const express = require("express");
const router = express.Router();

const verifyUser = require("../middlewares/verifyUser");

router.get("/", (req, res) => {
  res.status(200).send("helloo world !!!");
});

module.exports = router;
