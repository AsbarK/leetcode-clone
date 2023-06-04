const JWT_SECRET = "secret";

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const autheader = req.headers["authorization"];
  if (!autheader) {
    return res.status(403).send("NO Auth Header");
  }
  const decode = jwt.verify(autheader, JWT_SECRET);
  if (decode && decode.id) {
    req.userId = decode.id;
    next();
  } else {
    res.status(403).send("Incorrect Token");
  }
}

module.exports = auth;
