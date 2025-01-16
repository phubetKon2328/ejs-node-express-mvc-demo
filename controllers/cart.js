const Product = require("../models/product");
const CartItem = require("../models/cart-item");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const product = await cart.getProducts();
    let total = 0;
    const data = await Promise.all(
      product.map((item) => {
        total += item.CartItem.quantity * item.price;

        return {
          productName: item.productName,
          price: item.price,
          imgUrl: item.imgUrl,
          quantity: item.CartItem.quantity,
        };
      })
    );

    res.render("Cart", {
      products: data,
      total,
      pageTitle: "Cart",
      path: "/cart",
    });
  } catch (err) {
    console.log("Error : Unable to get a cartProduct");
    console.log("Error : ", err);
  }
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.CartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })

    .catch((err) => {
      console.log("Error : Unable to get a cart");
      console.log("Error : ", err);
    });
};
