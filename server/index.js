import express from "express";

const app = express();
app.use(express.json());

import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
