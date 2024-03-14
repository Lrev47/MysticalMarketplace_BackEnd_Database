const express = require("express");
const OrderRouter = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
} = require("../db/order");

OrderRouter.post("/", async (req, res) => {
  try {
    const { status, price, quantity, userId } = req.body;

    const NewOrder = await createOrder(status, price, quantity, userId);
    res.send(NewOrder);
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.get("/", async (req, res) => {
  try {
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.delete("/", async (req, res) => {
  try {
    const Order = await deleteOrder(orderId);
    res.send(Order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = OrderRouter;
