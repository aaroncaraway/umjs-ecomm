const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsAuthRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ["welirusdkfnselriusn"],
  })
);

app.use(authRouter);
app.use(productsAuthRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3001, () => {
  console.log("listening!");
});
