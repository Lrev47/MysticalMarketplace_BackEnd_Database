const express = require("express");
const userRouter = express.Router();

const { getAllUsers, getUserById } = require("../db/user");

userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    res.error;
  }
});

module.exports = userRouter;
