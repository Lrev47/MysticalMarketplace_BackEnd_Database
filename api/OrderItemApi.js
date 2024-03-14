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

OrderItemRouter.patch("/", async (req, res) => {
  try {
    const updatedOrderItem = await updateOrderItemQuantity(orderitemId);
    res.send(updatedOrderItem);
  } catch (error) {
    console.log(error);
  }
});

OrderItemRouter.delete("/", async (req, res) => {
  try {
    const OrderItem = await deleteOrderItem(orderitemId);
    res.send(OrderItem);
  } catch (error) {}
});

module.exports = OrderItemRouter;
