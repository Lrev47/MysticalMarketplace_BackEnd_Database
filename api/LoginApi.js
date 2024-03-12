const express = require("express");
const { LogInUser } = require("../db/user");
const LogInRouter = express.Router();

LogInRouter.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    const { username, password } = req.body;
    const user = await LogInUser(username, password);

    if (user) {
      const token = "THE MOST SECURE TOKEN EVER";
      return res.send({ token, userId: user.id });
    }
    res.send({});
  } catch (error) {
    console.error(error);
  }
});

module.exports = LogInRouter;
