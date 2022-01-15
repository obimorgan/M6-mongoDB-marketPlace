/** @format */

import mongoose from "mongoose";
import productsRouter from ".";

const { Schema, model } = mongoose;

const cartModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, required: true, enum: ["active", "paid"] },
  products: [
    {
      name: String,
      price: Number,
      description: String,
      image: String,
      products_sku: String,
      quantity: Number,
      required: true,
    },
  ],
});

export default model("Cart", cartModel);
