const { Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    // 유저 ID
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userReal",
      required: true,
    },
    products: [
      {
        type: {
          // 상품 ID -> product
          id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          // 상품 갯수
          quantity: Number,
        },
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = CartSchema;
