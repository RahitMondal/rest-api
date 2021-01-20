const express = require("express");
const { check } = require("express-validator");

const categoriesController = require("../controllers/categories-controller");

const router = express.Router();

router.get("/", categoriesController.getCategories);

router.post(
  "/",
  check("name").not().isEmpty(),
  categoriesController.saveCategory
);

module.exports = router;
