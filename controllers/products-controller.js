const { validationResult } = require("express-validator");

const Product = require("../models/Product");
const Category = require("../models/Category");
const HttpError = require("../models/HttpError");

const saveProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(422, "input validation failed");
    return next(error);
  }

  let category;
  try {
    category = await Category.find({ name: req.body.category_name });
  } catch (err) {
    const error = new HttpError(500, "fetching category data failed");
    return next(error);
  }

  const category_name = category[0].name;
  const category_id = category[0]._id;

  const product = new Product({
    name: req.body.name,
    category_name,
    category_id,
  });

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(500, "product creation failed");
    return next(error);
  }

  res.status(201).json(product.toObject());
};

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching data");
    return next(error);
  }

  res.json({ products: products.map((product) => product) });
};

const deleteProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.product_id);
    console.log(product);
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching product");
    return next(error);
  }

  if (product) {
    try {
      await product.remove();
    } catch (err) {
      const error = new HttpError(500, "Error deleting product");
      return next(error);
    }
  } else {
    const error = new HttpError(500, "No such product exists");
    return next(error);
  }

  res.json("product removed");
};

module.exports = { saveProduct, getProducts, deleteProduct };
