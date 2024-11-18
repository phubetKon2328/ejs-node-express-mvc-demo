const express = require("express");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();
const PORT = 3333;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("Error : Unable to find Id");
      console.log("Error : ", err);
    });
});

app.use(shopRoute);

app.use("/admin", adminRoute);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    console.log("All models were synchronized successfully.");
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Maxwell", email: "maxwell@cat.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(Object.keys(user.__proto__)); //Log method associate relation
    console.log(user);
    
    return user.createCart();
  })
  .then((cart) => {
    console.log(cart);
    
    app.listen(PORT, () => {
      console.log(`sever listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
