const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema(
  {
    id: { type: Number, default: 0 },
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
      // 옵션 등록 수정 삭제
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      // 브랜드 등록 수정 삭제
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);
ProductSchema.plugin(AutoIncrement, { inc_field:'id' });


module.exports = ProductSchema;
