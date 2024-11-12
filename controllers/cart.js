const Cart = require("../models/cart");
const Product = require("../models/product");
exports.getProduct = (req, res, next) => {
  res.render("Cart", { path: "/cart" });
};

exports.postCart = (req, res, next) => {
  const cart = new Cart();
  const product = new Product();
  const { productId } = req.body;

  product.findById(productId, (data) => {
    cart.addProduct(productId, data.price);
  });

  res.redirect("/cart");
};
