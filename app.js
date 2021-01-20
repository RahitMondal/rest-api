const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config");
const HttpError = require("./models/HttpError");
const categoriesRouter = require("./router/categories-router");
const productsRouter = require("./router/products-router");

const app = express();

app.use(bodyParser.json()); // parses the data into javaScript object and calls the next function behind the scenes

app.use("/api/categories", categoriesRouter);

app.use("/api/products", productsRouter);

app.use(() => {
  throw new HttpError(404, "this route is not valid");
}); // throwing error for invalid route

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res.status(err.code || 500);
    res.json({ message: err.message || "something went wrong!" });
  }
}); // this is default error handler

mongoose
  .connect(config.db)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started at port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
