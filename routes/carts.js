const express = require("express");

const router = express.Router();

router.get("/mycart", (req, res) => {
  res.send("MY CART!!");
});
module.exports = router;
