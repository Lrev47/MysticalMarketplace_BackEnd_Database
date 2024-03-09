const express = require("express");
const OrderItemRouter = express.Router();

const {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
} = require("../db/Products");

OrderItemRouter.post("/", async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    const NewOrderItem = await createOrderItem(productId, quantity, price);
    res.send(NewOrderItem);
  } catch (error) {
    console.log(error);
  }
});

OrderItemRouter.get("/", async (req, res) => {
  try {
    const orderItems = await getAllOrderItems();
    res.send(orderItems);
  } catch (error) {
    res.status(500).send({ error });
  }
});

OrderItemRouter.get("/:id", async (req, res) => {
  try {
    const orderItem = await getOrderItemById(req.params.id);
    res.send(orderItem);
  } catch (error) {
    res.error;
  }
});

module.exports = OrderItemRouter;
