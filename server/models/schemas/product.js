const { Schema } = require("mongoose");
const ProductSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = ProductSchema;
