const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/add-product",
    isEditing: false,
  });
};
exports.getProducts = (req, res, next) => {
  console.log("getProducts admin");
};
exports.postAddProduct = (req, res, next) => {
  const { productName, imageUrl, price } = req.body;
  const product = new Product(productName, imageUrl, price);
  product.save();
  
  res.redirect("/Product");
};
exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  if (!edit) {
    return res.redirect("/");
  }
  res.render("/admin/add-product", {
    path: "/admin/add-product",
    isEditing: edit,
  });
};
