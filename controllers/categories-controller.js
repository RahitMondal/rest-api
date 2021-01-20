const { validationResult } = require("express-validator");

const Category = require("../models/Category");
const HttpError = require("../models/HttpError");

const saveCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(422, "Input validation failed");
    return next(error);
  }

  const category = new Category({
    name: req.body.name,
  });

  try {
    await category.save();
  } catch (err) {
    const error = new HttpError(500, "Category creation failed!");
    return next(error);
  }

  res.status(201).json(category.toObject());
};

const getCategories = async (req, res, next) => {
  let categories;

  try {
    categories = await Category.find();
  } catch (err) {
    const error = new HttpError(
      500,
      "Can't fetch users. Something went wrong!"
    );
    return next(error);
  }

  res.json({ categories: categories.map((category) => category.toObject()) });
};

module.exports = { saveCategory, getCategories };
