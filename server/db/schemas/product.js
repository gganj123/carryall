const { Schema } = require("mongoose");
const ProductSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      default:"원산지"
    },
    detail: {
      type: String,
      default:"디테일"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = ProductSchema;
