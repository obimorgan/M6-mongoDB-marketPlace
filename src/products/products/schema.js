/** @format */

import mongoose from "mongoose";

//Retriving Schema and model from mongoose
const { Schema, model } = mongoose;

// schema for reviews to embeed into products schema
const reviewsSchema = new Schema(
  {
    author: { type: String, required: false },
    reviews: { type: String, required: true },
    rate: {
      type: Number,
      min: [0, "rate cannot be below zero"],
      max: [5, "rate cannot be above five"],
      default: 5,
    },
  },
  { timestamps: true }
);

// schema for the products collection
const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [reviewsSchema],
    product_sku: { type: String },
  },
  { timestamps: true }
);

export default model("Product", productsSchema);
