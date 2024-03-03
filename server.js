//import the reqired stuff
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const server = express();
const PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
server.use(bodyParser.json());

server.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

server.get("/", (req, res) => {
  res.send("DO YOU SEE ME?");
});

server.get("/health", (req, res) => {
  res.send("its working");
});

server.use("/api", require("./api"));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
