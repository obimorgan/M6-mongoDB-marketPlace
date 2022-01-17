/** @format */

import express from "express";
import cartSchema from "./schema.js";
import productsSchema from "../products/products/schema.js";
import createHttpError from "http-errors";

const cartRouter = express.Router();

//Post product
//sum price and quantity
//get user id, price, quantity
//find product id from req.body
//post product to cart
cartRouter.route("/:userId").post(async (req, res, next) => {
  try {
    const { product_sku, quantity } = req.body;
    console.log(product_sku);
    const productToBuy = await productsSchema.findOne({ product_sku });
    // console.log(priceToAdd);
    if (productToBuy) {
      const isProductInCart = await cartSchema.findOne({
        userId: req.params.userId,
        status: "active",
        "products.product_sku": product_sku,
      });
      if (isProductInCart) {
        const cart = await cartSchema.findOneAndUpdate(
          // if theere is product/s in the cart with the matching details below
          {
            userId: req.params.userId,
            status: "active",
            "products.product_sku": product_sku,
          },
          {
            // post additional product and update the quantity value using $inc
            $inc: {
              "products.$.quantity": quantity,
              "products.$.price": productToBuy.price * quantity,
            },
          },
          { new: true, upsert: true }
        );
        const productInCart = cart.products.length;
        console.log(productInCart);

        const cartTotal = cart.products
          .map((product) => product.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        res.send({ cart, productInCart, cartTotal });
      } else {
        const productToAdd = { ...productToBuy.toObject(), quantity };
        const cart = await cartSchema.findOneAndUpdate(
          { userId: req.params.userId, status: "active" },
          { $push: { products: productToAdd } },
          { new: true }
        );
        res.send({ cart, cartTotal });
      }
    } else {
      next(
        createHttpError(
          404,
          `Product with product_sku ${product_sku} does not exist or has been deleted.`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
//get all carts
cartRouter.route("/").get(async (req, res, next) => {
  try {
    const cart = await cartSchema.find();
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//get a cart by Id
cartRouter.route("/").get(async (req, res, next) => {
  try {
    const cart = await cartSchema.find();
    res.send(cart);
  } catch (error) {
    next(error);
  }
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
