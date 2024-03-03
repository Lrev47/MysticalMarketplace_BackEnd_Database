const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.send("Yo");
});

router.use("/products", require("./products"));

module.exports = router;
