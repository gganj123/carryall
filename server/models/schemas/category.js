const { Schema } = require("mongoose");
const shortId = require("./types/short-id.js");

const ProductSchema = new Schema({
  id:shortId,
  name: {
    type: String,
    required: true,
  },
});

module.exports = ProductSchema;
