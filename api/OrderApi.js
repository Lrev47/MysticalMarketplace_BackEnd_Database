const express = require("express");
const OrderRouter = express.Router();
const { verifyToken } = require("./Authenticate");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
} = require("../db/order");

OrderRouter.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    const NewOrder = await createOrder(userId);
    res.send(NewOrder);
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.get("/:orderId", verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    res.send("order Deleted");
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.delete("/:orderId", verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const Order = await deleteOrder(orderId);
    res.send(Order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = OrderRouter;
