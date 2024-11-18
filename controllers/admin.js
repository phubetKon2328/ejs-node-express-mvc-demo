const { where } = require("sequelize");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  Product.findByPk(2).then((product) => {
  });
  res.render("admin/edit-product", {
    path: "/add-product",
    isEditing: false,
  });
};
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((data) => {
      res.render("admin/product", {
        products: data,
        path: "/admin/products",
        pageTitle: "admin product",
      });
    })
    .catch((err) => {
      console.log("Error : Unable to fetch all admin products");
      console.error("Error : ", err);
    });
};
exports.postAddProduct = (req, res, next) => {
  const { productName, imageUrl, price } = req.body;
  req.user
    .createProduct({ productName, price, imgUrl: imageUrl })
    .then((result) => {
      console.log("Success : Create a product");
      res.redirect("/Product");
    })
    .catch((err) => {
      console.log("Error : Unable to create a product");
      console.log("Error : ", err);
    });
};
exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  const { productId } = req.params;

  if (!edit) return res.redirect("/");

  req.user
    .getProducts({ where: { id: productId } })
    .then((product) => {
      res.render("admin/edit-product", {
        path: "/admin/add-product",
        pageTitle: "Update Product",
        product: product[0],
        isEditing: edit,
      });
    })
    .catch((err) => {
      console.log("Error : Unable to find an id to edit the product");
      console.log("Error : ", err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, productName, imageUrl, price } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.productName = productName;
      product.imgUrl = imageUrl;
      product.price = price;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Error : Unable to update the product");
      console.log("Error : ", err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .then((err) => {
      console.log("Error : Unable to delete the product");
      console.log("Error : ", err);
    });
};
