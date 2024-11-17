const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

exports.getProduct = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("Product", {
        products: data,
        path: "/product",
        pageTitle: "Product",
      });
    })
    .catch((err) => {
      console.log("Error : Unable to fetch all products");
      console.error("Error : ", err);
    });
};

exports.getProductById = (req, res, next) => {
  const { productId } = req.params;
  Product.findByPk(productId)
    .then((data) => {
      res.render("ProductDetail", {
        products: data,
        path: "/product",
      });
    })
    .catch((err) => {
      console.log("Error : Unable to find a product id");
      console.error("Error : ", err);
    });
};

exports.postAddProduct = (req, res, next) => {
  console.log("postAddProduct");
};
