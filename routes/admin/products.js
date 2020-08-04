const express = require("express");

const router = express.Router();

router.get("/admin/products", (req, res) => {
  res.send("PRODUCT PAGE");
});

router.get("/admin/products/new", (req, res) => {
  res.send("ADD NEW PRODUCT!!");
});

module.exports = router;
