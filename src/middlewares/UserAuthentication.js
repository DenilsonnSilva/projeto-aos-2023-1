import jwt from "jsonwebtoken";

const userAuthentication = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.MY_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token inválido." });
      }

      req.userId = decoded.userId;

      next();
    });
  } else {
    return res.status(401).json({ message: "Token não fornecido." });
  }
};

export default userAuthentication;
