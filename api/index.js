const express = require("express");
const router = express.Router();
const productRouter = require("./ProductsApi");
const userRouter = require("./userApi");
const OrderItemRouter = require("./OrderItemApi");
const LogInRouter = require("./LoginApi");
const OrderRouter = require("./OrderApi");

router.get("/health", (req, res) => {
  res.send("Yo");
});

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/OrderItem", OrderItemRouter);
router.use("/login", LogInRouter);
router.use("/Order", OrderRouter);

module.exports = router;
