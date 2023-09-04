const jwt = require("jsonwebtoken");
const { authFunktion } = require("../models/users/index");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token is expired" });
      }

      return next(err);
    }

    try {
      const user = await authFunktion.findById(decode.id);

      if (user.token !== token) {
        return res.status(401).send({ message: "You are not authorize" });
      }

      req.user = { id: decode.id };

      next();
    } catch (err) {
      next(err);
    }
  });
};

module.exports = authenticate;
