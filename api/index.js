const express = require("express");
const router = express.Router();
const productRouter = require("./ProductsApi");
const userRouter = require("./userApi");
const OrderItemRouter = require("./OrderItemApi");
const LogInRouter = require("./LoginApi");

router.get("/health", (req, res) => {
  res.send("Yo");
});

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/OrderItem", OrderItemRouter);
router.use("/login", LogInRouter);

module.exports = router;
