/** @format */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./products/products/index.js";
import reviewsRouter from "./products/reviews/index.js";
import listEndpoints from "express-list-endpoints";
import { notFoundHandler, badRequesthHandler } from "./errorhandlers.js";

//creates a server
const server = express();

// providing port for server
const PORT = process.env.PORT;

//middlewares
//allow connection to front-end
server.use(cors());
//converts data to json()
server.use(express.json());
//errorhandling
server.use(notFoundHandler);
server.use(badRequesthHandler);

//routes - endpoints
server.use("/products", productsRouter, reviewsRouter);

//Grabs the address from .env
mongoose.connect(process.env.MONGO_CONNECTION);

//connects to MongoDb
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  server.listen(PORT, () => {
    console.log("Server listens to port:", PORT);
    console.table(listEndpoints(server));
  });
});
//handles error for connections
mongoose.connection.on("error", (err) => {
  console.log(err);
});
