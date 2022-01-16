/** @format */

import express from "express";
import createHttpError from "http-errors";
import productsSchema from "../products/schema.js";

const reviewsRouter = express.Router();

reviewsRouter
  .route("/:productId/reviews")
  .post(async (req, res, next) => {
    try {
      const product = await productsSchema.findByIdAndUpdate(
        req.params.productId,
        { $push: { reviews: req.body } },
        { new: true }
      );
      if (product) {
        res.status(201).send(product);
      } else {
        next(
          createHttpError(
            404,
            `Could not find product with this id: ${req.params.productId}`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const product = await productsSchema.findById(req.params.productId);
      if (product) {
        res.status(201).send(product.reviews);
      } else {
        next(
          createHttpError(
            404,
            `Could not find the reviews for this product: ${req.params.productId}`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  });

reviewsRouter
  .route("/:productId/reviews/:reviewId")
  .get(async (req, res, next) => {
    try {
      //find the product containing the review
      const product = await productsSchema.findById(req.params.productId);
      if (product) {
        //find the review's _id(mongoose object _id) turn it into strings
        //to enable matching with the reviews req.params -->use the method .find()
        const reviewIindex = product.reviews.find(
          (review) => review._id.toString() === req.params.reviewId
        );
        //if there is a found (the params matches with an existing _id)
        if (reviewIindex) {
          // send the review
          res.send(reviewIindex);
        } else {
          next(
            createHttpError(
              404,
              `The review with this id: ${req.params.reviewId} is not found`
            )
          );
        }
      } else {
        next(
          createHttpError(
            404,
            `The review with this id: ${req.params.productId} is not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  })

  // Editing a Review belonging to a product
  .put(async (req, res, next) => {
    try {
      // find the product containing the review
      const product = await productsSchema.findById(req.params.productId);
      if (product) {
        // If product is found -> find the index of the review in the product.reviews (is an array)
        // Review's _id is a mongo object-> need to stringify-> in order to match
        // with the target review coming from the params
        const reviewIindex = product.reviews.findIndex(
          (review) => review._id.toString() === req.params.reviewId
        );
        3;
        if (reviewIindex !== -1) {
          // once the matching review is found
          product.reviews[reviewIindex] = {
            //destructure the review to access the reviews index and convert it back to a mongoose object Id
            // using .toObject() method
            ...product.reviews[reviewIindex].toObject(),
            // access the reviews req.body to edit
            ...req.body,
          };
          // Save the edited review to mongo
          await product.save();
          res.send(product);
        } else {
          next(
            createHttpError(
              404,
              `the review with this Id ${req.params.reviewId}is not found`
            )
          );
        }
      }
    } catch (error) {}
  })
  .delete(async (req, res, next) => {
    try {
      // find the product by using the req.params.productId
      const product = await productsSchema.findByIdAndUpdate(
        req.params.productId,
        //inside the reviews array find the _id matching with the id req,parms.reviewId
        // Usin the emongoose operator $pull to delete the review
        { $pull: { reviews: { _id: req.params.reviewId } } },
        { new: true }
      );
      if (product) {
        res.send();
      } else {
        next(
          createHttpError(
            404,
            `the review with this Id ${req.params.reviewId}is not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  });

export default reviewsRouter;
