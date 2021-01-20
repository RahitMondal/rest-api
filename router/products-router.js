const express = require("express");
const { check } = require("express-validator");

const productsController = require("../controllers/products-controller");

const router = express.Router();

router.post("/", check("name").not().isEmpty(), productsController.saveProduct);

router.get("/", productsController.getProducts);

router.delete("/", productsController.deleteProduct);

module.exports = router;
