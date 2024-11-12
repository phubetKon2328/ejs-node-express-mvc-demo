const fs = require("fs");
const path = require("path");
module.exports = class Cart {
  addProduct(id, productPrice) {
    const filePath = path.join(__dirname, "..", "data", "product.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }
      try {
        const products = JSON.parse(data);
        const exitingProductIndex = cart.products.findIndex(
          (data) => data.id === id
        );
        const exitingProduct = cart.products[exitingProductIndex];
        let updatedProduct;
        if (exitingProduct) {
          updatedProduct = { ...exitingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[exitingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        const cartFilePath = path.join(__dirname, "..", "data", "cart.json");
        fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
          console.error("Error writing the file", err);
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  }
};
