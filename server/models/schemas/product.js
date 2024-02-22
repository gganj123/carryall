const { Schema } = require("mongoose");
const shortId = require("./types/short-id.js");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ProductSchema = new Schema(
  {
    productId: {type: Number, default: 0},
    categoryId: {
      type: shortId,
      ref: "Category",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productDate: Date, // required true가 아니면 디폴트값 설정해도 좋을 듯, 상품 등록일 = createdAt? 처리 괜찮은지
    option: {
      // 옵션이 한정되어 있을 경우 n개 중에 고르게 하기
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
    timestamps: true,
  }
);

module.exports = ProductSchema;
