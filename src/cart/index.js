/** @format */

import express from "express";
import cartSchema from "./schema.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .get(async (req, res, next) => {
    try {
    } catch (error) {}
  });

cartRouter
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

export default cartRouter;
