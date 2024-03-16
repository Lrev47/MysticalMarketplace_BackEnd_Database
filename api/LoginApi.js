const express = require("express");
const jwt = require("jsonwebtoken");
const { LogInUser } = require("../db/user");

const LogInRouter = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

LogInRouter.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    const { username, password } = req.body;
    const user = await LogInUser(username, password);

    if (user) {
      const payload = {
        userId: user.id,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

      return res.send({ token, userId: user.id });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = LogInRouter;
