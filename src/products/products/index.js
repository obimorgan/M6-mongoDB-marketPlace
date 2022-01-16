/** @format */

import express from "express";
import productsSchema from "./schema.js";
import q2m from "query-to-mongo";
import createHttpError from "http-errors";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
      const newProduct = await new productsSchema(req.body).save();
      res.status(201).send(newProduct);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const mongoQuery = q2m(req.query); // converting express query to mongoose
      const noOfProducts = await productsSchema.countDocuments(
        //--display the sum total of items in products
        mongoQuery.criteria
      );
      const products = await productsSchema
        .find(mongoQuery.criteria)
        .limit(mongoQuery.options.limit || 6)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort);
      res.send({
        link: mongoQuery.links("/products", noOfProducts),
        pageTotal: Math.ceil(noOfProducts / mongoQuery.options.limit),
        noOfProducts,
        products,
      });
    } catch (error) {
      next(error);
    }
  });

productsRouter
  .route("/:productId")
  .get(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await productsSchema.findById(productId);
      if (product) {
        res.status(201).send(product);
      } else {
        next(
          createHttpError(
            404,
            `Product with this id ${productId} does not exist`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const editProduct = await productsSchema.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      if (editProduct) {
        res.status(201).send(editProduct);
      } else
        next(
          createHttpError(
            404,
            `Product with this id ${productId} does not exist`
          )
        );
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const deleteProduct = await productsSchema.findByIdAndDelete(productId, {
        new: true,
      });
      if (deleteProduct) {
        res.send();
      } else {
        next(
          createHttpError(
            404,
            `Product with this id ${productId} does not exist`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  });

export default productsRouter;
