const Product = require("../models/product");

exports.getData = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("Shop", {
        products: data,
        pageTitle: "Shop",
        path: "/shop",
      });
    })
    .catch((err) => {
      console.log("Error : Unable to fetch all data");
      console.error("Error : ", err);
    });
};

exports.getDataById = (req, res, next) => {
  const product = new Product();
  console.log(req.params.productId);
};
