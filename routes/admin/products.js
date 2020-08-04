const express = require("express");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("../../routes/admin/validators");
const { validationResult } = require("express-validator");

const router = express.Router();

router.get("/admin/products", (req, res) => {
  res.send("PRODUCT PAGE");
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
  const errors = validationResult(req);

  console.log(errors);

  //   if (!errors.isEmpty()) {
  //     res.send(productsNewTemplate({ req, errors }));
  //   }

  res.send("Product created successfully!");
});

module.exports = router;
