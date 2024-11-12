const Product = require("../models/product");

exports.getData = (req, res, next) => {
  const product = new Product();
  product.fetchAll((data) => {
    res.render("Shop", {
      products: data,
      pageTitle: "Shop",
      path: "/shop",
    });
  });
};

exports.getDataById = (req,res,next) => {
  const product = new Product();
  console.log(req.params.productId);
  
}

