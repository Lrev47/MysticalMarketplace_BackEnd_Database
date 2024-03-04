const express = require("express");
const router = express.Router();
const productRouter = require("./ProductsApi");

router.get("/health", (req, res) => {
  res.send("Yo");
});

router.use("/products", productRouter);

module.exports = router;
