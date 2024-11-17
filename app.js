const express = require("express");

const sequelize = require("./util/database");

const app = express();

const PORT = 3333;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use(shopRoute);

app.use("/admin", adminRoute);

sequelize
  .sync()
  .then((result) => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`sever listening at port ${PORT}`);
});
