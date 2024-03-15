const express = require("express");
const OrderItemRouter = express.Router();

const {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItem,
  updateOrderItemQuantity,
} = require("../db/OrderItem");

OrderItemRouter.post("/", async (req, res) => {
  try {
    const { quantity, price, productId, orderId } = req.body;

    const NewOrderItem = await createOrderItem(
      quantity,
      price,
      productId,
      orderId
    );
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
    console.log(error);
  }
});

OrderItemRouter.get("/:id", async (req, res) => {
  try {
    const orderItem = await getOrderItemById(req.params.id);
    res.send(orderItem);
  } catch (error) {
    console.log(error);
  }
});

OrderItemRouter.patch("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedOrderItem = await updateOrderItemQuantity(
      req.params.id,
      quantity
    );
    res.send(updatedOrderItem);
  } catch (error) {
    console.log(error);
  }
});

OrderItemRouter.delete("/:id", async (req, res) => {
  try {
    const OrderItem = await deleteOrderItem(req.params.id);
    res.send(OrderItem);
  } catch (error) {}
});

module.exports = OrderItemRouter;
