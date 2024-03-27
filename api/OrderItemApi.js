const express = require("express");
const OrderItemRouter = express.Router();

const {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItem,
  updateOrderItemQuantity,
  getOrderItemsByOrderId,
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

OrderItemRouter.get("/", async (req, res) => {
  try {
    const { orderId } = req.query;
    console.log(`Received request for orderId: ${orderId}`);
    if (!orderId) {
      return res.send("orderID is needed");
    }

    const orderItems = await getOrderItemsByOrderId(orderId);
    console.log(`Returning order items to the client`, orderItems);
    res.json(orderItems);
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

OrderItemRouter.delete("/", async (req, res) => {
  try {
    const { orderItemId } = req.body;
    await deleteOrderItem(orderItemId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = OrderItemRouter;
