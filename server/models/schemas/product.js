const { Schema } = require("mongoose");
const shortId= require('./types/short-id');

const ProductSchema = new Schema({
  productId: {
    default:"Product"+shortId
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: '작성자',
  }
},
 {
  timestamps: true,
});

module.exports = ProductSchema;
