const express = require("express");

const app = express();

const PORT = 3333;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use(shopRoute);

app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`sever listening at port ${PORT}`);
});
