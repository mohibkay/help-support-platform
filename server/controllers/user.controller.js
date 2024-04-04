import jwt from "jsonwebtoken";
import { users } from "../mock/users.js";
const JWT_SECRET =
  "e64094b63547cc51fe35246969f716261623ddde40dbc651ffe4b42da9ee898c04169c56dc313e3deabe7a43a31ae49484e030e15ea01bcab1e08d700fbd63eb";

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ message: "Login successful", token });
};

export { login };
