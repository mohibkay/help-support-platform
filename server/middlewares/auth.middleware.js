import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🐬 ~ verifyToken ~ token:", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("🐬 ~ verifyToken ~ req.user:", req.user);
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export { verifyToken };
