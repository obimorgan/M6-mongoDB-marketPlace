/** @format */

import express from "express";
import usersSchema from "./schema.js";

const usersRouter = express();

usersRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
    } catch (error) {}
  })
  .get(async (req, res, next) => {
    try {
    } catch (error) {}
  });

usersRouter
  .route("/:userId")
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

export default usersRouter;
