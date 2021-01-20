const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const Schmea = mongoose.Schema;

const categorySchema = new Schmea({
  name: { type: String, required: true, unique: true },
});

categorySchema.plugin(mongooseUniqueValidator); // makes sure that the name field is unique

module.exports = mongoose.model("Category", categorySchema);
