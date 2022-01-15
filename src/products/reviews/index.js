/** @format */

import express from "express";
import productsSchema from "./schema.js";

const reviewsRouter = express();

reviewsRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .get(async (req, res, next) => {
    try {
    } catch (error) {}
  });

reviewsRouter
  .route("/:productId")
  .get(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .put(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .delete(async (req, res, next) => {
    try {
    } catch (error) {}
  });

export default reviewsRouter;
