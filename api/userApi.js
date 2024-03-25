const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  updateMoneyByUserId,
  updateUserMoney,
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

userRouter.patch("/:id", async (req, res) => {
  try {
    const { userId, totalBalance } = req.body;
    const updateUser = await updateMoneyByUserId(userId, totalBalance);
    res.json(updateUser);
  } catch (error) {
    console.error(error);
  }
});

userRouter.patch("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { moneyNum } = req.body;
    const updatedMoneyNum = await updateUserMoney(userId, moneyNum);
    res.json(updatedMoneyNum);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    res.error;
  }
});

module.exports = userRouter;
