import jwt from "jsonwebtoken";
import { users } from "../mock/users.js";
import { JWT_SECRET } from "../config.js";

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const { id, username: foundUsername, role } = user;

  const token = jwt.sign(
    { userId: id, username: foundUsername, role },
    JWT_SECRET
  );
  res.json({ message: "Login successful", token, username, role });
};

export { login };
