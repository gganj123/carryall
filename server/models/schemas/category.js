const { Schema } = require("mongoose");
const shortId = require("./types/short-id.js");

const ProductSchema = new Schema({
  categoryId:shortId,
  categoryName: {
    type: String,
    required: true,
  },
});

module.exports = ProductSchema;
