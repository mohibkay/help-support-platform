import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";

import cors from "cors";
import { corsOptions } from "./config.js";

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const root = {
  quoteOfTheDay() {
    return Math.random() > 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random() {
    return Math.random();
  },
  rollDice({ numDice, numSides = 6 }) {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(Math.ceil(Math.random() * numSides));
    }
    return output;
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.all("/graphql", createHandler({ schema, rootValue: root }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";
import ticketRouter from "./routes/ticket.routes.js";

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/tickets", ticketRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
