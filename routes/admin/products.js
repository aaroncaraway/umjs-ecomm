const express = require("express");
const productsRepo = require("../../repositories/products");
const multer = require("multer");

const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("../../routes/admin/validators");
const { validationResult } = require("express-validator");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {
  res.send("PRODUCT PAGE");
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ req, errors }));
    }
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.send("Product created successfully!");
  }
);

module.exports = router;
