import express from "express";
import cors from "cors";
import { corsOptions } from "./config.js";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";
import ticketRouter from "./routes/ticket.routes.js";

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/tickets", ticketRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
