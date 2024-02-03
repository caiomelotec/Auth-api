const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const authToken = req.session.token;

  if (!authToken)
    return res.status(401).send({ message: "You are not authorized" });

  jwt.verify(authToken, "jwtkey", (err, data) => {
    if (err) res.status(401).send({ message: "You are not authorized" });

    next();
  });
}

module.exports = verifyUser;
