/** @format */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//creates a server
const server = express();
// providing port for server
const PORT = process.env.PORT;

//allow connection to front-end
server.use(cors);

//converts data to json()
server.use(express.json());

//Grabs the adress from .env
mongoose.connect(process.env.MONGO_CONNECTION);

//connects to MongoDb
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  server.listen(PORT, () => {
    console.log("Server listens to port:", PORT);
  });
});
//handles error for connections
mongoose.connection.on("error", (err) => {
  console.log(err);
});
