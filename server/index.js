import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";

import cors from "cors";
import { corsOptions } from "./config.js";

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return Math.ceil(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    return Array.from({ length: numRolls }, () => this.rollOnce());
  }
}

const root = {
  getDie({ numSides }) {
    return new RandomDie(numSides || 6);
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
