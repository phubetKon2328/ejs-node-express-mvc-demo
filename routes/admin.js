const express = require("express");
const adminController = require("../controllers/admin");

const route = express.Router();

route.get("/add-product", adminController.getAddProduct);

route.get("/products", adminController.getProducts);

route.get("/edit-product/:productId", adminController.getEditProduct);

route.post("/edit-product", adminController.postEditProduct);

route.post("/add-product", adminController.postAddProduct);

route.post("/del-product",adminController.postDeleteProduct);

module.exports = route;
