const mongoose = require("mongoose");

const Schmea = mongoose.Schema;

const productSchema = new Schmea({
  name: { type: String, required: true },
  category_name: { type: String, required: true },
  category_id: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
