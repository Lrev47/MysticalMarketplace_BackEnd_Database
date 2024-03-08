const express = require("express");
const router = express.Router();
const productRouter = require("./ProductsApi");
const userRouter = require("./userApi");
const OrderItemRouter = require("./OrderItemApi");

router.get("/health", (req, res) => {
  res.send("Yo");
});

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/OrderItem", OrderItemRouter);

module.exports = router;
