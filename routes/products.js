const express = require("express");
const productsRepo = require("../repositories/products");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(`<h1>${products[0].title}</h1>`);
});

module.exports = router;
