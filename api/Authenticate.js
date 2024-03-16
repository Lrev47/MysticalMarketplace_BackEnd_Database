const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  console.log("AUTHTICATING");
  const authHeader = req.headers["authorization"];
  console.log("THIS SHOULD BE THE KEY", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.send({ error: "NO TOKEN" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.send({ error: "WRONG TOKEN" });
    }
    console.log("authenticated", user);
    req.user = user;
    next();
  });
}

module.exports = { verifyToken };
