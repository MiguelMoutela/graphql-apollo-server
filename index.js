import http from "http";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

import schema from "./graphql/";
import { mongoURI as db } from "./config/keys";

const server = new ApolloServer({
  schema
});

const app = express();
const httpServer = http.createServer(app);
const port = process.env.port || "8000";

app.use(cors());

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

server.applyMiddleware({ app, path: "/graphql" });

httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
