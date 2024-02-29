const { Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    // 유저 ID
    id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    username: {
      type: String,
      required: true,
    },
    products: [
      {
        type: {
          // 상품 ID -> product
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          option: String,
          // 상품 갯수
          quantity: Number,
        },
        required: false,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = CartSchema;
