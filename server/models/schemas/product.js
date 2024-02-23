const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema(
  { 
    id: {
    type: Number,
    default: 0,
    required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
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
ProductSchema.plugin(AutoIncrement, { inc_field:'id' });

module.exports = ProductSchema;
