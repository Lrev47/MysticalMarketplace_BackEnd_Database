function verifyToken(req, res, next) {
  console.log("AUTHTICATING");
  const authHeader = req.headers["authorization"];
  console.log("THIS SHOULD BE THE KEY", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  const ProjectToken = "THE_MOST_SECURE_TOKEN_EVER";

  if (!token) {
    return res.send({ error: "NO TOKEN" });
  }

  if (token === ProjectToken) {
    console.log("authenticated");
    next();
  } else {
    return res.send({ error: "WRONG TOKEN" });
  }
}

module.exports = { verifyToken };
