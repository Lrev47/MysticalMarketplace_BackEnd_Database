const express = require("express");
const productRouter = express.Router();

const { getAllProducts } = require("../db/Products");

productRouter.get("/", async (req, res) => {
  try {
    console.log("Getting Products");
    const products = await getAllProducts();
    console.log("PRODUCTS", products);
    res.send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = productRouter;
