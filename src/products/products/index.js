/** @format */

import express from "express";
import productsSchema from "./schema.js";

const productsRouter = express();

productsRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .get(async (req, res, next) => {
    try {
    } catch (error) {}
  });

productsRouter
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

export default productsRouter;
