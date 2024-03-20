const express = require("express");
const jwt = require("jsonwebtoken");
const { LogInUser } = require("../db/user");

const LogInRouter = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

LogInRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await LogInUser(username, password);

    if (user && user.token) {
      return res.send({
        token: user.token,
        userId: user.userId,
        orders: user.Order,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = LogInRouter;
