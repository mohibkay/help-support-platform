import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";
import cors from "cors";
import { corsOptions } from "./config.js";

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

const db = {};

const root = {
  getMessage({ id }) {
    if (!db[id]) {
      throw new Error(`No message exists with ${id}`);
    }
    return new Message(id, db[id]);
  },

  createMessage({ input }) {
    const id = Math.floor(Math.random());
    db[id] = input;
    return new Message(id, input);
  },

  updateMessage({ id, input }) {
    if (!db[id]) {
      throw new Error(`No message exists with ${id}`);
    }
    db[id] = input;
    return new Message(id, input);
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
