const express = require("express");
const productsRepo = require("../repositories/products");
const productsList = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsList({ products }));
  //   res.send(`<h1>${products[0].title}</h1>`);
});

module.exports = router;
