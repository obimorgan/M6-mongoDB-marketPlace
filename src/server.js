/** @format */

import express from "express";
import cors from "cors"; //allow connection to front-end
import mongoose from "mongoose";

const server = express();
const PORT = process.env.PORT;

server.use(cors);
server.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
  server.listen(PORT, () => {
    console.log("Server listens to port:", PORT);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
