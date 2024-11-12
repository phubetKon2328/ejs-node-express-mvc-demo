const express = require("express");

const route = express.Router();

const shopController = require("../controllers/shop");
const productController = require("../controllers/product");
const cartController = require("../controllers/cart");
const ordersController = require("../controllers/order");

route.get("/", shopController.getData);

route.get("/product", productController.getProduct);

route.get("/product/:productId", productController.getProductById);

route.post("/product/:productId", productController.postAddProduct);

route.get("/cart", cartController.getProduct);

route.post("/cart", cartController.postCart);

route.get("/orders", ordersController.getProduct);

module.exports = route;
