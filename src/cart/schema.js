/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, enum: ["active", "paid"] },
    products: [
      {
        name: String,
        price: Number,
        description: String,
        image: String,
        product_sku: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default model("Cart", cartSchema);
