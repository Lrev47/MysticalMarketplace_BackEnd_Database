const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  updateMoneyByUserId,
  deductFromUserBalance,
  updateUserMoney,
  getUserBalance,
} = require("../db/user");
const { verifyToken } = require("./Authenticate");

userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
});

userRouter.patch("/AddMoney", async (req, res) => {
  try {
    const { userId, moneyNum } = req.body;

    const updateUser = await updateMoneyByUserId(userId, moneyNum);
    res.json(updateUser);
  } catch (error) {
    console.error(error);
  }
});

userRouter.patch("/deduct-balance", async (req, res) => {
  try {
    const { userId, totalCost } = req.body;

    const updatedUser = await deductFromUserBalance(userId, totalCost);
    res.json({
      message: "USers balance has been updated.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
});

userRouter.patch("/deductMoney", async (req, res) => {
  try {
    const { userId, totalBalance } = req.body;
    console.log("Request Body:", req.body);
    console.log("INFO HIT BACKEND ENDPOINT:", userId, totalBalance);
    const newAmount = await updateUserMoney(userId, totalBalance);
    res.json(newAmount);
    console.log("SHOULD RETURN NEW AMOUNT:", newAmount);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});
userRouter.get("/balance/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const balance = await getUserBalance(userId);
    if (balance !== null) {
      res.json({ userId, balance });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user balance" });
  }
});

module.exports = userRouter;
