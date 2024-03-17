const express = require("express");
const OrderRouter = express.Router();
const { verifyToken } = require("./Authenticate");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  findOrCreatePendingOrder,
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

OrderRouter.get("/current", verifyToken, async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    if (isNaN(userId)) {
      return res.status(403).send("User id Not valid");
    }

    const order = await findOrCreatePendingOrder(userId);
    res.json(order);
  } catch (error) {
    console.error("Error finding or creating  order:", error);
    res.send("error");
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
