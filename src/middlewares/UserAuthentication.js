import jwt from "jsonwebtoken";

const userAuthentication = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, process.env.MY_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token!" });
      }

      req.userId = decoded.userId;

      next();
    });
  } else {
    return res.status(401).json({ message: "Token not provided!" });
  }
};

export default userAuthentication;
