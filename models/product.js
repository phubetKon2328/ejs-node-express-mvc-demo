const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(productName, imgUrl, price) {
    this.productName = productName;
    this.price = price;
    this.imgUrl = imgUrl;
  }
  readFromFile(cb) {
    const filePath = path.join(__dirname, "..", "data", "product.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      const parseJson = JSON.parse(data);
      cb(parseJson);
    });
  }
  save() {
    this.id = Math.random().toString();
    const filePath = path.join(__dirname, "..", "data", "product.json");
    this.readFromFile((data) => {
      // products.push(this);
      const updatedProducts = [...data, { ...this }];
      // console.log("push Product", updatedProducts);

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        console.log('Error writing product file',err);
      });
    });
  }
  fetchAll(cb) {
    this.readFromFile((data) => {
      cb(data);
    });
  }
  findById(id, cb) {
    this.fetchAll((product) => {
      const productId = product.find((item) => item.id === id);
      cb(productId);
    });
  }
};

const products = [
  {
    id: "001",
    productName: "แมวส้ม",
    price: "28",
    imgUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTIhYIblsFpMG0wcF4vAM6FyizmFcaPy6BFbc1q6M8gKKffNdA3",
  },
  {
    id: "005",
    productName: "อ้วนน้อย",
    price: "22",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXnSOuLIXZXXyT2He_-xZaMaKSAwa-nQvRsg&s",
  },
];
