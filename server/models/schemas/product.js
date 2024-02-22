const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema(
  { 
    _id: {
    type: Number,
    default: 0,
    required: true
    },
    categoryId: {
      type: String,
      ref: "Category",
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    option: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, versionKey: false
  }
);
ProductSchema.plugin(AutoIncrement, { inc_field:'_id' });

module.exports = ProductSchema;
