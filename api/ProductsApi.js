const express = require("express");
const productRouter = express.Router();

const { getAllProducts, getProductById } = require("../db/Products");

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    res.error;
  }
});

module.exports = productRouter;
