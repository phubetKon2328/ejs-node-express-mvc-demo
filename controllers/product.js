const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

exports.getProduct = (req, res, next) => {
  const product = new Product();
  product.fetchAll((data) => {
    res.render("Product", {
      products: data,
      path: "/product",
      pageTitle: "Product",
    });
  });
};

exports.getProductById = (req, res, next) => {
  const product = new Product();
  const { productId } = req.params;
  product.findById(productId, (product) => {
    console.log(product);

    res.render("ProductDetail", {
      products: product,
      path: "/product",
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("postAddProduct");
};
