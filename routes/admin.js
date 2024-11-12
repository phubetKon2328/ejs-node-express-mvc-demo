const express = require("express");
const adminController = require("../controllers/admin");

const route = express.Router();

route.get("/add-product", adminController.getAddProduct);

route.get("/products", adminController.getProducts);

route.post("/add-product", adminController.postAddProduct);

route.get("/edit-product/:productId", adminController.getEditProduct);

module.exports = route;
