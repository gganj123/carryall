const { Schema } = require("mongoose");
const shortId = require("./types/short-id.js");

const ProductSchema = new Schema({
  categoryId: {
    default: "category" + shortId,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

module.exports = ProductSchema;
